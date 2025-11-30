import StudyPlan from "../models/StudyPlan.js";

// --------------------------------------------
// SAVE STUDY PLAN
// --------------------------------------------
export const saveStudyPlan = async (req, res) => {
  try {
    const { title, plan } = req.body;

    if (!plan) {
      return res.status(400).json({ message: "Plan data missing" });
    }

    const newPlan = await StudyPlan.create({
      userId: req.user._id,
      title: title || "Untitled Plan",
      plan,
    });

    res.json({ success: true, plan: newPlan });
  } catch (err) {
    console.error("Save Plan Error:", err);
    res.status(500).json({ message: "Failed to save study plan" });
  }
};

// --------------------------------------------
// GET ALL PLANS
// --------------------------------------------
export const getAllStudyPlans = async (req, res) => {
  try {
    const plans = await StudyPlan.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({ success: true, plans });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch study plans" });
  }
};

// --------------------------------------------
// GET SINGLE PLAN
// --------------------------------------------
export const getStudyPlanById = async (req, res) => {
  try {
    const plan = await StudyPlan.findById(req.params.id);

    if (!plan)
      return res.status(404).json({ message: "Study plan not found" });

    res.json({ success: true, plan });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch study plan" });
  }
};

// --------------------------------------------
// DELETE PLAN
// --------------------------------------------
export const deleteStudyPlan = async (req, res) => {
  try {
    await StudyPlan.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Study plan deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete study plan" });
  }
};