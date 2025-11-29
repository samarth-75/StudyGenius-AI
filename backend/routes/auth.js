import express from "express";
import { register, login, getProfile, logout, updateProfile, updatePassword } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.post("/logout", protect, logout);

router.put("/update-profile", protect, updateProfile);
router.put("/update-password", protect, updatePassword);

export default router;