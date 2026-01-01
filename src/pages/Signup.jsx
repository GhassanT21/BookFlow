import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    register(form.fullName, form.email, form.password)
      .then(() => navigate("/home"))
      .catch((err) => {
        const m = err?.response?.data?.message;
        setMessage(Array.isArray(m) ? m.join(", ") : "Failed to create account");
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="text-sm text-gray-600 mt-1">
            Join BookFlow and start ordering books
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
              Full name
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

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
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              minLength={6}
            />
          </div>

          <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
