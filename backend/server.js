import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import aiRoutes from "./routes/aiRoutes.js";
import summarizerRoutes from "./routes/summarizerRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";
import studyPlanRoutes from "./routes/studyPlanRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:8080", "http://localhost:5173"],
  credentials: true,
}));

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// connect to DB
connectDB().catch(err => {
  console.error("DB connection failed:", err);
  process.exit(1);
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/summarize", summarizerRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/plans", studyPlanRoutes);
app.use("/api/dashboard", dashboardRoutes);

// example protected route (alternate)
app.get("/api/hello-protected", async (req, res) => {
  res.json({ msg: "public endpoint — replace with protected one" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
