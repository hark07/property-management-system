import Booking from "../models/Booking.js";
import { getIO } from "../socket/socket.js";
import createNotification from "../utils/createNotification.js";

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const {
      property,
      amenity,
      bookingDate,
      checkIn,
      checkOut,
      purpose,
      guests,
    } = req.body;

    const conflict = await Booking.findOne({
      amenity,

      bookingDate,

      status: {
        $in: ["Pending", "Approved"],
      },

      checkIn: {
        $lt: checkOut,
      },

      checkOut: {
        $gt: checkIn,
      },
    });

    if (conflict) {
      return res.status(400).json({
        success: false,

        message: "This time slot is already booked.",
      });
    }

    const booking = await Booking.create({
      tenant: req.user._id,

      property,

      amenity,

      bookingDate,

      checkIn,

      checkOut,

      purpose,

      guests,
    });

    const populatedBooking = await Booking.findById(booking._id)

      .populate("tenant", "name email")

      .populate("property")

      .populate("amenity", "name");

    getIO().emit("bookingCreated", populatedBooking);

    await createNotification({
      user: req.user._id,

      title: "Booking Created",

      message: "Your booking request has been submitted.",

      type: "Booking",

      link: "/bookings",
    });

    res.status(201).json({
      success: true,

      message: "Booking created successfully.",

      booking: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// User Get Own Bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      tenant: req.user._id,
    })

      .populate("tenant", "name email")

      .populate("property")

      .populate("amenity", "name")

      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,

      count: bookings.length,

      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Admin Get All Bookings
export const getAllBookings = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,

        message: "Admin access required.",
      });
    }

    const bookings = await Booking.find()

      .populate("tenant", "name email")

      .populate("property", "title city")

      .populate("amenity", "name")

      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,

      count: bookings.length,

      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==============================
// Get Single Booking
// ==============================
export const getBooking = async (req, res) => {
  try {

    let booking;


    if (
      req.user.role === "admin" ||
      req.user.role === "owner" ||
      req.user.role === "staff"
    ) {

      booking = await Booking.findById(req.params.id)

        .populate("tenant", "name email")

        .populate("property")

        .populate("amenity", "name");

    } else {

      booking = await Booking.findOne({
        _id: req.params.id,
        tenant: req.user._id,
      })

        .populate("tenant", "name email")

        .populate("property")

        .populate("amenity", "name");

    }


    if (!booking) {

      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });

    }


    res.status(200).json({
      success: true,
      booking,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==============================
// Update Booking
// ==============================
export const updateBooking = async (req, res) => {
  try {

    let booking;


    if (
      req.user.role === "admin" ||
      req.user.role === "owner"
    ) {

      booking = await Booking.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )
      .populate("tenant", "name email")
      .populate("property")
      .populate("amenity", "name");


    } else {


      booking = await Booking.findOneAndUpdate(
        {
          _id: req.params.id,
          tenant: req.user._id,
        },

        req.body,

        {
          new:true,
          runValidators:true,
        }
      )
      .populate("tenant", "name email")
      .populate("property")
      .populate("amenity", "name");

    }


    if(!booking){

      return res.status(404).json({
        success:false,
        message:"Booking not found."
      });

    }


    getIO().emit(
      "bookingUpdated",
      booking
    );


    res.status(200).json({
      success:true,
      message:"Booking updated successfully.",
      booking
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};

// Delete Booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({
      _id: req.params.id,

      tenant: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,

        message: "Booking not found.",
      });
    }

    getIO().emit("bookingDeleted", {
      id: req.params.id,
    });

    res.status(200).json({
      success: true,

      message: "Booking deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Cancel Booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,

        tenant: req.user._id,
      },

      {
        status: "Cancelled",
      },

      {
        new: true,
      },
    );

    if (!booking) {
      return res.status(404).json({
        success: false,

        message: "Booking not found.",
      });
    }

    getIO().emit("bookingCancelled", booking);

    res.status(200).json({
      success: true,

      message: "Booking cancelled successfully.",

      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
