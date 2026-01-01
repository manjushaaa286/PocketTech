import { Routes, Route } from "react-router-dom";
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
  return (
    <div className="app">
      <Navbar />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <div style={{ borderTop:"1px solid rgba(255,255,255,.08)", color:"var(--muted)", padding:"18px 0" }}>
        <div className="container" style={{ display:"flex", justifyContent:"space-between", gap: 12, flexWrap:"wrap" }}>
          <div>© {new Date().getFullYear()} PocketTech</div>
          <div>Verified pre-owned devices marketplace</div>
        </div>
      </div>
    </div>
  );
}
