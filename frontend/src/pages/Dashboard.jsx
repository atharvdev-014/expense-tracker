import { useEffect, useState } from "react";
import API from "../utils/api";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await API.get("/income");
        const expenseRes = await API.get("/expenses");        
        setIncomes(incomeRes.data);
        setExpenses(expenseRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  // TOTALS
  const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  // MERGED RECENT TRANSACTIONS
  const transactions = [
    ...incomes.map((i) => ({ ...i, type: "income" })),
    ...expenses.map((e) => ({ ...e, type: "expense" })),
  ]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["#6366f1", "#f43f5e"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-6">

      {/* TOP CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 rounded-2xl shadow-lg text-white">
          <h2 className="text-lg font-medium">Total Income</h2>
          <p className="text-4xl font-bold mt-4">₹{totalIncome}</p>
        </div>

        <div className="bg-gradient-to-br from-rose-500 to-rose-700 p-6 rounded-2xl shadow-lg text-white">
          <h2 className="text-lg font-medium">Total Expense</h2>
          <p className="text-4xl font-bold mt-4">₹{totalExpense}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-2xl shadow-lg text-white">
          <h2 className="text-lg font-medium">Balance</h2>
          <p className="text-4xl font-bold mt-4">₹{balance}</p>
        </div>

      </div>

      {/* CHART + TRANSACTIONS */}
      <div className="grid grid-cols-3 gap-6">

        {/* Donut Chart */}
        <div className="bg-white shadow p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
          <Doughnut data={chartData} />
        </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow p-6 rounded-2xl col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

          <ul className="space-y-3">
            {transactions.map((t) => (
              <li
                key={t._id}
                className="flex justify-between p-3 rounded-lg border"
              >
                <span className="font-medium">{t.title}</span>

                <span
                  className={
                    t.type === "income"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {t.type === "income" ? "+" : "-"} ₹{t.amount}
                </span>
              </li>
            ))}
          </ul>

        </div>
      </div>

    </div>
  );
}
