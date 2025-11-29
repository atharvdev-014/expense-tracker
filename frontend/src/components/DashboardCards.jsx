export default function DashboardCards() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-gray-500">Total Balance</p>
        <h2 className="text-2xl font-bold">$91,100</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-gray-500">Total Income</p>
        <h2 className="text-2xl font-bold">$98,200</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-gray-500">Total Expenses</p>
        <h2 className="text-2xl font-bold">$7,100</h2>
      </div>

    </div>
  );
}
