import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createExpense,
  getExpenses,
  deleteExpense
} from "../controllers/expenseController.js";

const router = express.Router();

// Create expense
router.post("/", authMiddleware, createExpense);

// Get all expenses
router.get("/", authMiddleware, getExpenses);

// Delete expense
router.delete("/:id", authMiddleware, deleteExpense);

export default router;