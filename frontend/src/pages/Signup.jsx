import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/signup", {
      name,
      email,
      password,
      profession,
    });

    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full p-3 border rounded-lg mb-4"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          >
            <option value="">Select Profession</option>
            <option value="Student">Student</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Business Owner">Business Owner</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Other">Other</option>
          </select>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
          >
            Signup
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}