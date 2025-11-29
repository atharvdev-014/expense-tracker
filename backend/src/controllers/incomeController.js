import Income from "../models/Income.js";

// ✅ Add Income
export const addIncome = async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ message: "Title and amount are required" });
    }

    const income = await Income.create({
      user: req.user.id,
      title,
      amount,
      category,
      date,
      description
    });

    res.status(201).json(income);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get All Incomes
export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({
      createdAt: -1
    });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Delete Income
export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    if (income.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await income.deleteOne();
    res.json({ message: "Income deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};