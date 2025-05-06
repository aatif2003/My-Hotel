const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get all users
const getUsers = async (req, res, next) => {
  try{
 const users=await User.find();
 if(!users){
  res.status(400);
  throw new Error("users donot found")
 }
 return res.status(200).json(users);
  }catch(err){
    next(err)
  }
};

// Create a new user
const createUsers = async (req, res, next) => {
  try {
    const { password, ...userData } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      ...userData,
      password: hashedPassword
    });

    if (!user) {
      res.status(400);
      throw new Error("User not created");
    }

    const { password: _, ...userWithoutPassword } = user._doc;

    return res.status(201).json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
};

// Login user
const loginUser = async (req, res, next) => {
  try {
    //todo use joi to validate the data
    
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      res.status(400);
      throw new Error("Password does not match");
    }

    const token = jwt.sign(
      { id: user._id, isadmin: user.isadmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000
    });

    const { password: _, ...userWithoutPassword } = user._doc;

    return res.status(200).json({ user: userWithoutPassword,  });

  } catch (err) {
    next(err);
  }
};
const logoutUser=async (req,res,next)=>{
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
    res.status(200).json({ message: "You have been logged out" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  createUsers,
  loginUser,logoutUser
};
