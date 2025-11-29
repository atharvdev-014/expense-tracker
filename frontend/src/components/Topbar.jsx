export default function Topbar() {
  return (
    <div className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Expense Tracker</h2>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}