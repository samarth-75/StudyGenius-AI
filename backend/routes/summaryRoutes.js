import express from "express";
import { protect } from "../middleware/auth.js";
import { saveSummary, getSummaries } from "../controllers/summaryController.js";
import {
  getSummaryById,
  deleteSummary,
} from "../controllers/summaryController.js";

const router = express.Router();

router.post("/save", protect, saveSummary);
router.get("/all", protect, getSummaries);

router.get("/all", getSummaries);
router.get("/:id", getSummaryById);
router.delete("/:id", deleteSummary);


export default router;