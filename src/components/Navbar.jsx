import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAdmin, clearAdmin } from "../api";

export default function Navbar() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const admin = getAdmin();
  const count = items.reduce((sum, item) => sum + item.qty, 0);

  const navClass = ({ isActive }) =>
    `hover:text-indigo-600 ${
      isActive ? "text-indigo-600 font-semibold" : "text-slate-700"
    }`;

  function onLogout() {
    logout();
    navigate("/login");
  }

  function adminLogout() {
    clearAdmin();
    window.location.reload();
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/home" className="font-bold text-xl text-indigo-600 tracking-tight">
            BookFlow
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/home" className={navClass}>Home</NavLink>
            <NavLink to="/about" className={navClass}>About</NavLink>
            <NavLink to="/features" className={navClass}>Features</NavLink>
            <NavLink to="/contact" className={navClass}>Contact</NavLink>
            <NavLink to="/orders" className={navClass}>My Orders</NavLink>

            <NavLink to="/cart" className="relative text-slate-700 flex items-center gap-1">
              <span>Cart</span>
              {count > 0 && (
                <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5">
                  {count}
                </span>
              )}
            </NavLink>

            <div className="flex items-center gap-3">
              <span className="text-slate-700">Hi, {user?.fullName}</span>
              <button
                onClick={onLogout}
                className="border rounded px-3 py-1 text-sm hover:bg-slate-50"
              >
                Logout
              </button>
            </div>

            {admin && (
              <div className="flex items-center gap-3">
                <NavLink to="/admin/panel" className={navClass}>Admin</NavLink>
                <button
                  onClick={adminLogout}
                  className="border rounded px-3 py-1 text-sm hover:bg-slate-50"
                >
                  Admin Logout
                </button>
              </div>
            )}
          </nav>

          <button
            className="md:hidden border rounded px-2 py-1 text-sm"
            onClick={() => setOpen((prev) => !prev)}
          >
            Menu
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2 text-sm">
            <NavLink to="/home" onClick={() => setOpen(false)} className="block">Home</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)} className="block">About</NavLink>
            <NavLink to="/features" onClick={() => setOpen(false)} className="block">Features</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)} className="block">Contact</NavLink>
            <NavLink to="/orders" onClick={() => setOpen(false)} className="block">My Orders</NavLink>
            <NavLink to="/cart" onClick={() => setOpen(false)} className="block">Cart</NavLink>

            <div className="pt-2 space-y-2">
              <div className="text-slate-700">Hi, {user?.fullName}</div>
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="border rounded px-3 py-1 text-sm hover:bg-slate-50"
              >
                Logout
              </button>
            </div>

            {admin && (
              <div className="pt-2 space-y-2">
                <NavLink to="/admin/panel" onClick={() => setOpen(false)} className="block">
                  Admin
                </NavLink>
                <button
                  onClick={() => {
                    setOpen(false);
                    adminLogout();
                  }}
                  className="border rounded px-3 py-1 text-sm hover:bg-slate-50"
                >
                  Admin Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
