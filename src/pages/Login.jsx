import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    setMessage("");
    login(form.email, form.password)
      .then(() => navigate("/home"))
      .catch(() => setMessage("Invalid email or password"));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-sm text-gray-600 mt-1">
            Sign in to continue to BookFlow
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded border bg-red-50 text-red-700 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
