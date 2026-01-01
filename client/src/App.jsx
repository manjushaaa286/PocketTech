import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Product from "./pages/Product";
import Sell from "./pages/Sell";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";

export default function App(){
  const getAuthed = () => sessionStorage.getItem("pt_logged_in") === "true";
  const [isLoggedIn, setIsLoggedIn] = useState(getAuthed());

  useEffect(() => {
    const update = () => setIsLoggedIn(getAuthed());

    update();
    window.addEventListener("pockettech:auth", update);
    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener("pockettech:auth", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <div className="app">
      {isLoggedIn ? <Navbar /> : null}

      <main className="content">
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Protected */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><Product /></ProtectedRoute>} />
          <Route path="/sell" element={<ProtectedRoute><Sell /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/order/:id" element={<ProtectedRoute><Order /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
        </Routes>
      </main>

      {isLoggedIn ? (
        <div style={{ borderTop:"1px solid rgba(255,255,255,.08)", color:"var(--muted)", padding:"18px 0" }}>
          <div className="container" style={{ display:"flex", justifyContent:"space-between", gap: 12, flexWrap:"wrap" }}>
            <div>© {new Date().getFullYear()} PocketTech</div>
            <div>Verified pre-owned devices marketplace</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
