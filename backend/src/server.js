import dotenv from "dotenv";
dotenv.config();

console.log("Loaded Cloudinary Key:", process.env.CLOUD_KEY);

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import incomeRoutes from "./routes/income.js";
import expenseRoutes from "./routes/expenses.js";
import authRoutes from "./routes/auth.js";
import dashboardRoute from "./routes/dashboardRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoute);

// ✅ Root route to avoid "Cannot GET /"
app.get("/", (req, res) => {
  res.send("✅ Expense Tracker Backend is running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));