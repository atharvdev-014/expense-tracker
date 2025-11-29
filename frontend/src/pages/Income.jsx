import { useEffect, useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import API from "../utils/api";

export default function Income() {
  const [incomes, setIncomes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // Fetch incomes
  const fetchIncomes = async () => {
    try {
      const res = await API.get("/income");
      setIncomes(res.data);
    } catch (error) {
      console.log("Error fetching incomes:", error);
    }
  };

  // Add income
  const handleAddIncome = async () => {
    if (!title || !amount) return alert("Enter all fields");

    try {
      await API.post("/income", {
        title,
        amount,
        date: new Date().toISOString(),
      });

      setShowModal(false);
      setTitle("");
      setAmount("");

      fetchIncomes();
    } catch (error) {
      console.log("Error adding income:", error);
    }
  };

  // Delete income
  const handleDelete = async (id) => {
    try {
      await API.delete(`/income/delete-income/${id}`);
      fetchIncomes();
    } catch (error) {
      console.log("Error deleting income:", error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">Income</h1>

      {/* Total Income Card */}
      <div className="bg-purple-600 text-white p-6 rounded-2xl mb-8 shadow-lg">
        <h2 className="text-xl font-semibold">Total Income</h2>
        <p className="text-4xl font-bold mt-3">₹{totalIncome}</p>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white shadow-md rounded-2xl h-64 mb-8 flex items-center justify-center">
        <p className="text-gray-400">📈 Income Chart Coming Soon</p>
      </div>

      {/* Recent Income */}
      <h2 className="text-2xl font-semibold mb-4">Recent Income</h2>

      <div className="flex flex-col gap-4">
        {incomes.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg">{item.title}</p>
              <p className="text-gray-500 text-sm">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-green-600 font-bold text-xl">₹{item.amount}</p>

              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500"
              >
                <MdDelete size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-xl hover:bg-purple-700"
      >
        <MdAdd size={28} />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-96">
            <h2 className="text-xl font-bold mb-4">Add Income</h2>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg mb-3"
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-3 border rounded-lg mb-3"
            />

            <div className="flex justify-end gap-4 mt-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleAddIncome}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}