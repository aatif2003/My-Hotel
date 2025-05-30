const Booking = require("../models/bookingModel");

// Get all bookings
const getBooking = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    if (!bookings || bookings.length === 0) {
      res.status(404);
      throw new Error("No bookings found");
    }
    return res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

// Create a booking
const createBooking = async (req, res, next) => {
  try {
    const { roomId, name, email, checkInDate, checkoutDate } = req.body;

    const booking = await Booking.create({
      roomId,
    
      name,
      email,
      checkInDate,
      checkoutDate,
    });

    if (!booking) {
      res.status(400);
      throw new Error("Cannot book the room");
    }

    return res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};


// Update a booking
const updatedBooking = async (req, res, next) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!updated) {
      res.status(404);
      throw new Error("Booking not found to update");
    }
    return res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete a booking
const deletedBooking = async (req, res, next) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error("Booking not found to delete");
    }
    return res.status(200).json({ id: req.params.id });
  } catch (err) {
    next(err);
  }
};

// Get a single booking
const getSingleBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }
    return res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBooking,
  createBooking,
  updatedBooking,
  deletedBooking,
  getSingleBooking, // <- renamed correctly
};
