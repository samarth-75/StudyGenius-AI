import express from "express";
import {
  saveStudyPlan,
  getAllStudyPlans,
  getStudyPlanById,
  deleteStudyPlan,
} from "../controllers/studyPlanController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Save a plan
router.post("/save", protect, saveStudyPlan);

// Get all plans
router.get("/all", protect, getAllStudyPlans);

// View single plan
router.get("/:id", protect, getStudyPlanById);

// Delete plan
router.delete("/:id", protect, deleteStudyPlan);

export default router;