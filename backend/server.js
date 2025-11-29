import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:8080", "http://localhost:5173"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// connect to DB
connectDB().catch(err => {
  console.error("DB connection failed:", err);
  process.exit(1);
});

// routes
app.use("/api/auth", authRoutes);

// example protected route (alternate)
app.get("/api/hello-protected", async (req, res) => {
  res.json({ msg: "public endpoint — replace with protected one" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
