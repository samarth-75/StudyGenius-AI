import express from "express";
import { protect } from "../middleware/auth.js";
import StudyPlan from "../models/StudyPlan.js";
import Summary from "../models/Summary.js";

const router = express.Router();

// Dashboard Stats API
router.get("/stats", protect, async (req, res) => {
  try {
    const userId = req.user.id;

    // FIX: use userId instead of user
    const plans = await StudyPlan.countDocuments({ userId });
    const summaries = await Summary.countDocuments({ userId });

    const productivity = Math.min(100, plans * 5 + summaries * 2);

    res.json({ plans, summaries, productivity });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
});

export default router;