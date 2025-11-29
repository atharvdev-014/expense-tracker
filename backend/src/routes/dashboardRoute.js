import express from "express";
import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const incomes = await Income.find({});
    const expenses = await Expense.find({});

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    const balance = totalIncome - totalExpense;

    const recentTransactions = [
      ...incomes.map((i) => ({ ...i._doc, type: "income" })),
      ...expenses.map((e) => ({ ...e._doc, type: "expense" })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.json({
      totalIncome,
      totalExpense,
      balance,
      recentTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard error", error });
  }
});

export default router;
