import { Link, NavLink } from "react-router-dom";
import { loadCart } from "../cartStore";
import { useEffect, useState } from "react";

export default function Navbar(){

  // ✅ reactive cart count
  const getCount = () =>
    loadCart().reduce((s, x) => s + (x.qty || 1), 0);

  const [count, setCount] = useState(getCount());

  useEffect(() => {
    const update = () => setCount(getCount());

    update(); // initial load
    window.addEventListener("pockettech:cart", update);
    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener("pockettech:cart", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(14px)",
        background: "rgba(28,31,34,.78)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
        }}
      >
        <Link to="/" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div
            className="card"
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              display: "grid",
              placeItems: "center",
              outline: "1px solid rgba(65,140,255,.35)",
            }}
          >
            <span style={{ color: "var(--accent)", fontWeight: 900 }}>P</span>
          </div>
          <div>
            <div style={{ fontWeight: 900, letterSpacing: 0.2 }}>
              PocketTech
            </div>
            <div
              style={{
                color: "var(--muted)",
                fontSize: 12,
                marginTop: 2,
              }}
            >
              Verified pre-owned devices
            </div>
          </div>
        </Link>

        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <NavLink to="/" className="btn ghost">Home</NavLink>
          <NavLink to="/shop" className="btn ghost">Shop</NavLink>
          <NavLink to="/about" className="btn ghost">About</NavLink>
          <NavLink to="/sell" className="btn ghost">Sell Device</NavLink>
          <NavLink to="/contact" className="btn ghost">Contact</NavLink>

          <NavLink to="/cart" className="btn">
            Cart{" "}
            <span
              className="pill"
              style={{ padding: "4px 8px", color: "var(--text)" }}
            >
              {count}
            </span>
          </NavLink>

          {/* ✅ LOGOUT BUTTON */}
          <NavLink to="/logout" className="btn ghost">
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
}
