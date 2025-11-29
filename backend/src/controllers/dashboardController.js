// backend/src/controllers/dashboardController.js
import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

export const getDashboard = async (req, res) => {
  try {
    // Get all incomes & expenses (no auth required here; if you want per-user, change filter to { user: req.user.id })
    const incomes = await Income.find({});
    const expenses = await Expense.find({});

    const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount || 0), 0);
    const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const balance = totalIncome - totalExpense;

    const recentTransactions = [
      ...incomes.map((i) => ({ ...i._doc, type: "income" })),
      ...expenses.map((e) => ({ ...e._doc, type: "expense" })),
    ]
      .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
      .slice(0, 5);

    return res.json({
      totalIncome,
      totalExpense,
      balance,
      recentTransactions,
    });
  } catch (err) {
    console.error("Dashboard controller error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};