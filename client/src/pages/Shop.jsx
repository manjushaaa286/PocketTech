import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function useQuery(){
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const CATS = ["", "Mobiles", "Laptops", "Tablets", "Accessories", "Wearables", "Other"];

export default function Shop(){
  const query = useQuery();
  const defaultCategory = query.get("category") || "";
  const [q, setQ] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  async function load(){
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    const res = await fetch(`/api/products?${params.toString()}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, [category]); // eslint-disable-line
  useEffect(() => { setCategory(defaultCategory); }, [defaultCategory]);

  return (
    <div className="container" style={{ padding:"22px 18px 40px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"end", gap: 12, flexWrap:"wrap" }}>
        <div>
          <div className="pill">Shop</div>
          <h2 style={{ margin:"10px 0 0", fontSize: 30 }}>Phones, laptops, tablets and more</h2>
          <div style={{ color:"var(--muted)", marginTop:6 }}>Search by name/brand, filter by category.</div>
        </div>

        <div style={{ display:"flex", gap: 10, flexWrap:"wrap" }}>
          <input className="input" style={{ width: 320, maxWidth:"80vw" }} value={q} onChange={e=>setQ(e.target.value)}
                 placeholder="Search iPhone, Dell, Samsung..." />
          <select className="input" style={{ width: 200 }} value={category} onChange={e=>setCategory(e.target.value)}>
            {CATS.map(c => <option key={c} value={c}>{c ? c : "All"}</option>)}
          </select>
          <button className="btn primary" onClick={load}>Search</button>
        </div>
      </div>

      {toast && (
        <div className="card" style={{ padding:"12px 14px", marginTop: 14, outline:"1px solid rgba(57,217,138,.35)" }}>
          <div style={{ color:"var(--ok)", fontWeight:800 }}>{toast}</div>
        </div>
      )}

      <div className="grid products" style={{ marginTop: 16 }}>
        {loading ? (
          <div className="card" style={{ padding: 16, gridColumn:"1/-1" }}>Loading products…</div>
        ) : items.length === 0 ? (
          <div className="card" style={{ padding: 16, gridColumn:"1/-1" }}>No products found. Try a different search.</div>
        ) : (
          items.map(p => (
            <ProductCard key={p.id} p={p} onAdded={() => { setToast("Added to cart."); setTimeout(()=>setToast(""), 1200); }} />
          ))
        )}
      </div>
    </div>
  );
}
