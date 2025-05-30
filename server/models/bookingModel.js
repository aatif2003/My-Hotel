const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    roomId: {                      // <-- camelCase 'Id'
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    checkInDate: {                // <-- rename to this
      type: Date,
      required: true,
    },
    checkoutDate: {               // <-- rename to this
      type: Date,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
