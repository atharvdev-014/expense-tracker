import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },

    // ✅ Optional fields
    category: { type: String, default: "General" },
    description: { type: String, default: "" },

    date: { type: Date, required: true },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Expense", ExpenseSchema);