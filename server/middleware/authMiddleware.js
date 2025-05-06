const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const cookies=require("cookie-parser")

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: data.id }); // correct query

    if (!user) {
      return res.status(401).json({
        message: "Not authorized, user not found",
      });
    }

    req.user = user; // Attach user to request (optional but useful)

    next(); // move to next middleware
  } catch (err) {
    return res.status(401).json({
      message: "Not authorized, token invalid",
      error: err.message,
    });
  }
};



module.exports = auth