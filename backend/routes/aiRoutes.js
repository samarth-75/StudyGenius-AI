import express from "express";
import { generateStudyPlan } from "../controllers/aiController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/study-plan", protect, generateStudyPlan);

export default router;