import Amenity from "../models/Amenity.js";

// Create Amenity
export const createAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.create(req.body);

    res.status(201).json({
      success: true,
      message: "Amenity created successfully.",
      amenity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Amenities
export const getAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find().populate("property", "title city");

    res.status(200).json({
      success: true,
      count: amenities.length,
      amenities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Amenity
export const getAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findById(req.params.id);

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message: "Amenity not found.",
      });
    }

    res.status(200).json({
      success: true,
      amenity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Amenity
export const updateAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message: "Amenity not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Amenity updated successfully.",
      amenity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Amenity
export const deleteAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findByIdAndDelete(req.params.id);

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message: "Amenity not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Amenity deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAmenitiesByProperty = async (req, res) => {
  try {
    const amenities = await Amenity.find({
      property: req.params.propertyId,
    });

    res.status(200).json({
      success: true,

      amenities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
