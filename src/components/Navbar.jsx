import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useState } from "react";

export default function Navbar() {
  const { items } = useCart();
  const [open, setOpen] = useState(false);

  const count = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl text-indigo-600 tracking-tight">
            BookFlow
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-indigo-600 ${
                  isActive ? "text-indigo-600 font-semibold" : "text-slate-700"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-indigo-600 ${
                  isActive ? "text-indigo-600 font-semibold" : "text-slate-700"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                `hover:text-indigo-600 ${
                  isActive ? "text-indigo-600 font-semibold" : "text-slate-700"
                }`
              }
            >
              Features
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-indigo-600 ${
                  isActive ? "text-indigo-600 font-semibold" : "text-slate-700"
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink to="/cart" className="relative text-slate-700 flex items-center gap-1">
              <span>Cart</span>
              {count > 0 && (
                <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5">
                  {count}
                </span>
              )}
            </NavLink>
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
            <NavLink to="/" onClick={() => setOpen(false)} className="block">
              Home
            </NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)} className="block">
              About
            </NavLink>
            <NavLink
              to="/features"
              onClick={() => setOpen(false)}
              className="block"
            >
              Features
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="block"
            >
              Contact
            </NavLink>
            <NavLink to="/cart" onClick={() => setOpen(false)} className="block">
              Cart
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
