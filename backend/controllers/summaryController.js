import Summary from "../models/Summary.js";

export const saveSummary = async (req, res) => {
  try {
    const { title, summary } = req.body;

    if (!summary) {
      return res.status(400).json({ message: "Summary data missing" });
    }

    const newSummary = await Summary.create({
      userId: req.user._id,
      title: title || "Untitled Summary",
      summary: summary.summary,
      bulletPoints: summary.bulletPoints,
      keyTerms: summary.keyTerms,
      flashcards: summary.flashcards,
    });

    res.json({ success: true, summary: newSummary });
  } catch (err) {
    res.status(500).json({ message: "Failed to save summary" });
  }
};

export const getSummaries = async (req, res) => {
  try {
    const summaries = await Summary.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, summaries });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch summaries" });
  }
};

export const getSummaryById = async (req, res) => {
  try {
    const summary = await Summary.findById(req.params.id);

    if (!summary) return res.status(404).json({ message: "Summary not found" });

    res.json({ summary });
  } catch (err) {
    res.status(500).json({ message: "Error fetching summary" });
  }
};


export const deleteSummary = async (req, res) => {
  try {
    await Summary.findByIdAndDelete(req.params.id);
    res.json({ message: "Summary deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete summary" });
  }
};
