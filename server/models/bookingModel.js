const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    roomid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Room" 
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    checkingDates: {
      type: Date,
      required: true
    },
    checkoutDates: {
      type: Date,
      required: true
    },
    confirmed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Booking", BookingSchema);
