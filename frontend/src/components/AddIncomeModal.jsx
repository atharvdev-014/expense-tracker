import { useState } from "react";
import API from "../utils/api";

export default function AddIncomeModal({ onClose, onAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleAdd = async () => {
    if (!title || !amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/income", {
        title,
        amount,
      });

      onAdded();   // ✅ refresh income list
      onClose();   // ✅ close modal
    } catch (error) {
      console.log("Add income error:", error);
      alert("Failed to add income");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Income</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border rounded-lg mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full p-3 border rounded-lg mb-3"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}