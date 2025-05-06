const mongoose = require("mongoose");


// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isadmin: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model("User", userSchema);
