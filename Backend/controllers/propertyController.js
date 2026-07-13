import Property from "../models/Property.js";
import cloudinary from "../config/cloudinary.js";

// Upload Image To Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "properties",
          resource_type: "auto",
        },

        (error, result) => {
          if (error) {
            console.log("CLOUDINARY ERROR:", error);
            reject(error);
          } else {
            console.log("IMAGE URL:", result.secure_url);
            resolve(result.secure_url);
          }
        },
      )
      .end(file.buffer);
  });
};

// Create Property
export const createProperty = async (req, res) => {
  try {
    console.log("FILES:", req.files);

    let images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imageUrl = await uploadToCloudinary(file);

        images.push(imageUrl);
      }
    }

    const property = await Property.create({
      ...req.body,

      images,

      owner: req.user._id,
    });

    res.status(201).json({
      success: true,

      message: "Property created successfully.",

      property,
    });
  } catch (error) {
    console.log("CREATE PROPERTY ERROR:", error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
// Get All Properties
export const getProperties = async (req, res) => {
  try {
    const { search, type, status, city, page = 1, limit = 10 } = req.query;

    let query = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (type && type !== "All") {
      query.type = type;
    }

    if (status && status !== "All") {
      query.status = status;
    }

    if (city && city !== "All") {
      query.city = city;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const properties = await Property.find(query)

      .populate("owner", "name email")

      .sort({
        createdAt: -1,
      })

      .skip(skip)

      .limit(Number(limit));

    const total = await Property.countDocuments(query);

    res.status(200).json({
      success: true,

      total,

      page: Number(page),

      pages: Math.ceil(total / limit),

      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Get Single Property
export const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name email",
    );

    if (!property) {
      return res.status(404).json({
        success: false,

        message: "Property not found.",
      });
    }

    res.json({
      success: true,

      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Update Property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    // Owner can update own property, Admin can update all properties
    if (
      property.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }

    let images = property.images || [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imageUrl = await uploadToCloudinary(file);
        images.push(imageUrl);
      }
    }

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      message: "Property updated successfully.",
      property: updated,
    });

  } catch (error) {
    console.log("UPDATE PROPERTY ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    // Owner can delete own property, Admin can delete all properties
    if (
      property.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }

    await property.deleteOne();

    res.json({
      success: true,
      message: "Property deleted successfully.",
    });

  } catch (error) {
    console.log("DELETE PROPERTY ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};