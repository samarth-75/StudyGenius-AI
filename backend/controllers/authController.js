// controllers/authController.js

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

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
 * @desc   Login user
 * @route  POST /api/auth/login
 * @access Public
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }

  // Find user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Check password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Send token
  sendToken(user, 200, res);
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