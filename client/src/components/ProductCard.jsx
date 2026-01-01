import { addItem } from "../cartStore";
import { Link } from "react-router-dom";

export default function ProductCard({ p, onAdded }){
  return (
    <div className="card" style={{ gridColumn:"span 3", overflow:"hidden" }}>
      <div style={{ aspectRatio:"16/10", background:"rgba(0,0,0,.25)", overflow:"hidden", position:"relative" }}>
        <img src={p.image || ""} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        {p.discountPct ? (
          <div className="pill" style={{ position:"absolute", top: 12, left: 12, color:"var(--text)" }}>
            {p.discountPct}% OFF
          </div>
        ) : null}
      </div>

      <div style={{ padding: 14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", gap:10, alignItems:"start" }}>
          <div style={{ fontWeight:900, lineHeight:1.2 }}>{p.name}</div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontWeight:950, color:"var(--accent)" }}>₹{Number(p.price).toLocaleString("en-IN")}</div>
            {p.mrp ? <div style={{ color:"var(--muted)", textDecoration:"line-through", fontSize: 12 }}>₹{Number(p.mrp).toLocaleString("en-IN")}</div> : null}
          </div>
        </div>

        <div style={{ display:"flex", gap:8, marginTop:10, flexWrap:"wrap" }}>
          <span className="pill">{p.category}</span>
          <span className="pill">{p.condition}</span>
          <span className="pill">{p.brand}</span>
        </div>

        {p.emiFrom ? (
          <div style={{ color:"var(--muted)", marginTop: 10, fontSize: 13 }}>
            EMI from <span style={{ color:"var(--text)", fontWeight: 900 }}>₹{Number(p.emiFrom).toLocaleString("en-IN")}/mo</span>
          </div>
        ) : null}

        <div style={{ display:"flex", gap: 10, marginTop: 12 }}>
          <button
            className="btn primary"
            style={{ flex: 1 }}
            onClick={() => {
              addItem({ id: p.id, name: p.name, price: p.price, image: p.image });
              onAdded?.();
            }}
          >
            Add to Cart
          </button>
          <Link className="btn ghost" to={`/product/${p.id}`}>View</Link>
        </div>
      </div>
    </div>
  );
}
