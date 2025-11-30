import express from "express";
import multer from "multer";
import { summarizeNotes } from "../controllers/summarizerController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/text", protect, summarizeNotes);

export default router;