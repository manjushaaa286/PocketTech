import { useEffect, useState } from "react";
import { cartTotals, loadCart, removeItem, updateQty } from "../cartStore";
import { Link, useNavigate } from "react-router-dom";

export default function Cart(){
  const [cart, setCart] = useState(loadCart());
  const nav = useNavigate();

  useEffect(() => {
    const t = setInterval(()=> setCart(loadCart()), 400);
    return () => clearInterval(t);
  }, []);

  const totals = cartTotals(cart);

  return (
    <div className="container" style={{ padding:"22px 18px 40px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"end", flexWrap:"wrap", gap: 10 }}>
        <div>
          <div className="pill">Cart</div>
          <h2 style={{ margin:"10px 0 0", fontSize: 30 }}>Review your items</h2>
          <div style={{ color:"var(--muted)", marginTop:6 }}>Update quantity or proceed to checkout.</div>
        </div>
        <Link to="/shop" className="btn ghost">Continue Shopping</Link>
      </div>

      <div className="grid" style={{ gridTemplateColumns:"1.4fr .6fr", gap: 16, marginTop: 16 }}>
        <div className="card" style={{ padding: 14 }}>
          {cart.length === 0 ? (
            <div style={{ color:"var(--muted)" }}>
              Your cart is empty. <Link to="/shop" style={{ color:"var(--accent)" }}>Browse products</Link>.
            </div>
          ) : (
            <div className="grid" style={{ gap: 12 }}>
              {cart.map(it => (
                <div key={it.id} className="card" style={{ padding: 12, background:"rgba(0,0,0,.18)" }}>
                  <div style={{ display:"flex", gap: 12, alignItems:"center" }}>
                    <div style={{ width: 92, height: 62, borderRadius: 12, overflow:"hidden", background:"rgba(0,0,0,.25)" }}>
                      {it.image ? <img src={it.image} alt={it.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/> : null}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight: 900 }}>{it.name}</div>
                      <div style={{ color:"var(--muted)", marginTop: 4 }}>₹{Number(it.price).toLocaleString("en-IN")}</div>
                    </div>
                    <div style={{ display:"flex", gap: 8, alignItems:"center" }}>
                      <button className="btn" onClick={() => setCart(updateQty(it.id, Math.max(1, (it.qty||1) - 1)))}>-</button>
                      <div className="pill" style={{ color:"var(--text)" }}>{it.qty || 1}</div>
                      <button className="btn" onClick={() => setCart(updateQty(it.id, (it.qty||1) + 1))}>+</button>
                    </div>
                    <button className="btn ghost" onClick={() => setCart(removeItem(it.id))}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card" style={{ padding: 14, height:"fit-content" }}>
          <div style={{ fontWeight: 900, fontSize: 18 }}>Order Summary</div>
          <div style={{ display:"grid", gap: 8, marginTop: 12, color:"var(--muted)" }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}><span>Subtotal</span><span>₹{totals.subtotal.toLocaleString("en-IN")}</span></div>
            <div style={{ display:"flex", justifyContent:"space-between" }}><span>Shipping</span><span>{totals.shipping === 0 ? "Free" : `₹${totals.shipping}`}</span></div>
            <div style={{ height: 1, background:"rgba(255,255,255,.08)", margin:"6px 0" }} />
            <div style={{ display:"flex", justifyContent:"space-between", color:"var(--text)", fontWeight: 900 }}>
              <span>Total</span><span>₹{totals.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <button className="btn primary" style={{ width:"100%", marginTop: 12 }} disabled={cart.length===0}
                  onClick={() => nav("/checkout")}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
