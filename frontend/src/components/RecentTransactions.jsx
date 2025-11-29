export default function RecentTransactions() {
  const data = [
    { title: "Shopping", date: "17 Feb 2025", amount: -430 },
    { title: "Travel", date: "13 Feb 2025", amount: -670 },
    { title: "Salary", date: "12 Feb 2025", amount: +12000 },
    { title: "Electricity Bill", date: "11 Feb 2025", amount: -200 },
    { title: "Loan Repayment", date: "10 Feb 2025", amount: -600 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <button className="text-gray-500">See All →</button>
      </div>

      <div className="flex flex-col gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>

            <p
              className={`font-semibold ${
                item.amount > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.amount > 0 ? "+" : "-"}${Math.abs(item.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
