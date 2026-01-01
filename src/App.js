import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Features from "./pages/Features.jsx";
import Contact from "./pages/Contact.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Orders from "./pages/Orders.jsx";
import Admin from "./pages/Admin.jsx";
import AuthGuard from "./components/AuthGuard.jsx";
import { useAuth } from "./context/AuthContext";
import { getAdmin } from "./api";

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function RedirectIfLoggedIn({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/home" replace />;
  return children;
}

function AdminGuard({ children }) {
  const admin = getAdmin();
  if (!admin) return <Navigate to="/admin" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/login"
        element={
          <RedirectIfLoggedIn>
            <Login />
          </RedirectIfLoggedIn>
        }
      />

      <Route
        path="/signup"
        element={
          <RedirectIfLoggedIn>
            <Signup />
          </RedirectIfLoggedIn>
        }
      />

      <Route path="/admin" element={<Admin />} />
      <Route
        path="/admin/panel"
        element={
          <AdminGuard>
            <Admin />
          </AdminGuard>
        }
      />

      <Route
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
