import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: String,
  summary: String,
  bulletPoints: [String],
  keyTerms: [String],
  flashcards: [
    {
      question: String,
      answer: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Summary", summarySchema);