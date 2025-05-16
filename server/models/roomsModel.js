const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  des: { 
    type: String,
    required: true
  },
  roomNumbers: [
    {
      number: {
        type: Number,
        required: true
      },
      unavailableDates: {
        type: [Date],
        default: []
      }
    }
  ],
  images: {
    type: [String], // <-- This allows storing image URLs as an array of strings
    default: []
  }
});

module.exports = mongoose.model("Room", roomSchema);
