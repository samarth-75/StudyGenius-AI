// controllers/authController.js

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";

dotenv.config();

/**
 * Generate JWT and send it inside an HTTP-only cookie
 */
const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

  const cookieOptions = {
    httpOnly: true,           // cannot be accessed by JS
    secure: false,            // set true in production (HTTPS)
    sameSite: "strict",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
  };

  // Send response
  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
};

/**
 * @desc   Register a new user
 * @route  POST /api/auth/register
 * @access Public
 */
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please provide name, email, and password",
    });
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Send token in cookie
  sendToken(user, 201, res);
};



/**
 * @desc   Get logged-in user's profile
 * @route  GET /api/auth/profile
 * @access Private
 */
export const getProfile = async (req, res) => {
  res.json({
    success: true,
    user: req.user, // added by protect middleware
  });
};

/**
 * @desc   Logout user (clear cookie)
 * @route  POST /api/auth/logout
 * @access Private
 */
export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // expire immediately
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user WITH password field
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // 3. Login exactly like register
    sendToken(user, 200, res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    user.password = newPassword; // will be hashed by pre-save middleware
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const uploadProfilePhoto = async (req, res) => {
  try {
    const fileStr = req.body.image;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "studygenius/profile_photos",
      width: 300,
      height: 300,
      crop: "fill",
    });

    // Update user in DB
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePhoto: uploadResponse.secure_url },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile photo updated",
      url: user.profilePhoto,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

