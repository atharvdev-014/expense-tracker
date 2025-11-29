import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MdDashboard,
  MdAttachMoney,
  MdMoneyOff,
  MdLogout,
} from "react-icons/md";

export default function Sidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass =
    "flex items-center gap-3 px-4 py-3 text-lg rounded-xl transition-all font-medium";

  return (
    <div className="w-64 min-h-screen bg-[#f8f6ff] border-r border-[#ece8ff] flex flex-col p-6">

      {/* ✅ Profile Section */}
      <div className="text-center mb-10">
        <img
          src={
            user?.profilePic
              ? user.profilePic
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border"
        />

        <h2 className="text-xl font-semibold">
          {user?.name || "User"}
        </h2>

        <p className="text-sm text-gray-500">
          {user?.profession || "Finance Manager"}
        </p>
      </div>

      {/* ✅ Navigation Links */}
      <nav className="flex flex-col gap-3">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? "bg-purple-600 text-white" : "hover:bg-purple-200"
            }`
          }
        >
          <MdDashboard size={22} /> Dashboard
        </NavLink>

        <NavLink
          to="/income"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? "bg-purple-600 text-white" : "hover:bg-purple-200"
            }`
          }
        >
          <MdAttachMoney size={22} /> Income
        </NavLink>

        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? "bg-purple-600 text-white" : "hover:bg-purple-200"
            }`
          }
        >
          <MdMoneyOff size={22} /> Expense
        </NavLink>
      </nav>

      {/* ✅ Logout */}
      <button
        onClick={logout}
        className="mt-auto flex items-center gap-3 px-4 py-3 text-lg rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all"
      >
        <MdLogout size={22} /> Logout
      </button>
    </div>
  );
}