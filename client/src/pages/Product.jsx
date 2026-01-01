import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { addItem } from "../cartStore";

export default function Product(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [err, setErr] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (!res.ok) { setErr(data?.message || "Not found"); return; }
      setP(data);
    })();
  }, [id]);

  if (err) {
    return (
      <div className="container" style={{ padding:"22px 18px 40px" }}>
        <div className="card" style={{ padding: 16 }}>{err}</div>
        <div style={{ marginTop: 12 }}><Link to="/shop" className="btn">Back to Shop</Link></div>
      </div>
    );
  }

  if (!p) {
    return <div className="container" style={{ padding:"22px 18px 40px" }}><div className="card" style={{ padding:16 }}>Loading…</div></div>;
  }

  return (
    <div className="container" style={{ padding:"22px 18px 40px", maxWidth: 1050 }}>
      <div className="pill">{p.category}</div>
      <h2 style={{ margin:"10px 0 0", fontSize: 32 }}>{p.name}</h2>
      <div style={{ color:"var(--muted)", marginTop:6 }}>{p.brand} • {p.condition} • {p.warranty} • {p.returns}</div>

      {toast ? (
        <div className="card" style={{ padding:"12px 14px", marginTop: 14, outline:"1px solid rgba(57,217,138,.35)" }}>
          <div style={{ color:"var(--ok)", fontWeight: 900 }}>{toast}</div>
        </div>
      ) : null}

      <div className="grid" style={{ gridTemplateColumns:"1fr 1fr", gap: 16, marginTop: 16 }}>
        <div className="card" style={{ overflow:"hidden" }}>
          <div style={{ aspectRatio:"16/10", background:"rgba(0,0,0,.25)" }}>
            <img src={p.image} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ display:"flex", gap: 10, alignItems:"baseline", flexWrap:"wrap" }}>
              <div style={{ fontWeight: 950, fontSize: 26, color:"var(--accent)" }}>₹{Number(p.price).toLocaleString("en-IN")}</div>
              <div style={{ color:"var(--muted)", textDecoration:"line-through" }}>₹{Number(p.mrp).toLocaleString("en-IN")}</div>
              <div className="pill" style={{ color:"var(--text)" }}>{p.discountPct}% OFF</div>
            </div>
            <div style={{ color:"var(--muted)", marginTop: 10 }}>
              EMI options: <span style={{ color:"var(--text)", fontWeight:900 }}>from ₹{Number(p.emiFrom).toLocaleString("en-IN")}/month</span>
            </div>

            <div style={{ display:"flex", gap: 10, marginTop: 14, flexWrap:"wrap" }}>
              <button className="btn primary" onClick={() => { addItem({ id:p.id, name:p.name, price:p.price, image:p.image }); setToast("Added to cart."); setTimeout(()=>setToast(""), 1200); }}>
                Add to Cart
              </button>
              <Link className="btn ghost" to="/checkout">Buy Now</Link>
              <Link className="btn ghost" to="/shop">Back to Shop</Link>
            </div>
          </div>
        </div>

        <div className="grid" style={{ gap: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Highlights</div>
            <ul style={{ color:"var(--muted)", marginTop: 10, lineHeight:1.8 }}>
              {p.highlights?.map((h,i)=><li key={i}>{h}</li>)}
            </ul>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Offers & Discounts</div>
            <ul style={{ color:"var(--muted)", marginTop: 10, lineHeight:1.8 }}>
              {p.offers?.map((o,i)=><li key={i}>{o}</li>)}
            </ul>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Specifications</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 10, marginTop: 12 }}>
              {Object.entries(p.specs || {}).map(([k,v]) => (
                <div key={k} className="card" style={{ padding: 12, background:"rgba(0,0,0,.18)" }}>
                  <div style={{ color:"var(--muted)", fontSize: 12 }}>{k}</div>
                  <div style={{ fontWeight: 900, marginTop: 4 }}>{String(v || "-")}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
