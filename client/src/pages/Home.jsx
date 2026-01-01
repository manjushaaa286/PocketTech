import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Home(){
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setFeatured((data || []).slice(0, 8));
    })();
  }, []);

  return (
    <div className="container" style={{ padding:"26px 18px 40px" }}>
      <div className="card" style={{ padding:"26px", borderRadius:24, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.2fr .8fr", gap: 22, alignItems:"center" }}>
          <div>
            <div className="pill" style={{ marginBottom: 12 }}>Smart Devices for Every Pocket</div>
            <h1 style={{ margin:"0 0 10px", fontSize: 44, letterSpacing:-.5, lineHeight:1.05 }}>
              Buy verified pre-owned tech with confidence.
            </h1>
            <div style={{ color:"var(--muted)", fontSize: 16, lineHeight:1.55 }}>
              Phones, laptops, tablets, accessories and wearables — all with photos, grading and transparent pricing.
            </div>

            <div style={{ display:"flex", gap: 10, marginTop: 18, flexWrap:"wrap" }}>
              <Link to="/shop" className="btn primary">Explore Devices</Link>
              <Link to="/sell" className="btn ghost">Sell Your Device</Link>
              <Link to="/contact" className="btn ghost">Talk to Us</Link>
            </div>

            <div style={{ display:"flex", gap: 10, marginTop: 18, flexWrap:"wrap" }}>
              <span className="pill">Verified Quality</span>
              <span className="pill">Budget Deals</span>
              <span className="pill">Fast Checkout</span>
              <span className="pill">Photo Upload</span>
            </div>
          </div>

          <div style={{ display:"grid", gap: 12 }}>
            <div className="card" style={{ padding:16 }}>
              <div style={{ fontWeight: 900, fontSize: 18 }}>Popular Categories</div>
              <div style={{ color:"var(--muted)", marginTop: 6 }}>Mobiles, Laptops, Tablets, Accessories, Wearables</div>
              <div style={{ display:"flex", gap: 10, marginTop: 14, flexWrap:"wrap" }}>
                <Link to="/shop?category=Mobiles" className="btn">Mobiles</Link>
                <Link to="/shop?category=Laptops" className="btn">Laptops</Link>
                <Link to="/shop?category=Tablets" className="btn">Tablets</Link>
                <Link to="/shop?category=Accessories" className="btn">Accessories</Link>
                <Link to="/shop?category=Wearables" className="btn">Wearables</Link>
              </div>
            </div>

            <div className="card" style={{ padding:16 }}>
              <div style={{ fontWeight: 900, fontSize: 18 }}>How it works</div>
              <ol style={{ color:"var(--muted)", margin:"10px 0 0", paddingLeft: 18, lineHeight:1.7 }}>
                <li>Browse catalog with photos </li>
                <li>Add to cart and checkout</li>
                <li>Sell your device with photo upload</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18, display:"flex", justifyContent:"space-between", alignItems:"end", gap: 10, flexWrap:"wrap" }}>
        <div>
          <div className="pill">Featured</div>
          <h2 style={{ margin:"10px 0 0", fontSize: 28 }}>Devices available now</h2>
        </div>
        <Link to="/shop" className="btn ghost">View all</Link>
      </div>

      <div className="grid products" style={{ marginTop: 16 }}>
        {featured.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
