import { useMemo, useState } from "react";
import { cartTotals, clearCart, loadCart } from "../cartStore";
import { useNavigate } from "react-router-dom";

export default function Checkout(){
  const nav = useNavigate();
  const cart = loadCart();
  const totals = useMemo(()=>cartTotals(cart), [cart]);

  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({ fullName:"", phone:"", email:"" });
  const [address, setAddress] = useState({ line1:"", line2:"", city:"", state:"", pincode:"" });
  const [payment, setPayment] = useState({ method:"COD" });
  const [status, setStatus] = useState({ type:"", msg:"", orderId:"" });

  async function placeOrder(){
    setStatus({ type:"", msg:"", orderId:"" });
    const res = await fetch("/api/orders", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ items: cart, customer, address, payment })
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus({ type:"err", msg: data?.message || "Order failed.", orderId:"" });
      return;
    }
    clearCart();
    setStatus({ type:"ok", msg:"Order placed successfully!", orderId: data.orderId });
  }

  if (cart.length === 0 && !status.orderId) {
    return (
      <div className="container" style={{ padding:"22px 18px 40px" }}>
        <div className="card" style={{ padding: 16 }}>Your cart is empty. Add items before checkout.</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding:"22px 18px 40px", maxWidth: 920 }}>
      <div className="pill">Checkout</div>
      <h2 style={{ margin:"10px 0 0", fontSize: 30 }}>Complete your order</h2>
      <div style={{ color:"var(--muted)", marginTop:6 }}>Step {step} of 3</div>

      <div className="grid" style={{ gridTemplateColumns:"1.2fr .8fr", gap: 16, marginTop: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display:"flex", gap: 10, marginBottom: 14, flexWrap:"wrap" }}>
            <button className={"btn " + (step===1 ? "primary":"ghost")} onClick={()=>setStep(1)}>1. Customer</button>
            <button className={"btn " + (step===2 ? "primary":"ghost")} onClick={()=>setStep(2)}>2. Address</button>
            <button className={"btn " + (step===3 ? "primary":"ghost")} onClick={()=>setStep(3)}>3. Payment</button>
          </div>

          {step===1 && (
            <div className="grid" style={{ gap: 12 }}>
              <input className="input" placeholder="Full name *" value={customer.fullName}
                     onChange={e=>setCustomer({ ...customer, fullName: e.target.value })} />
              <div className="grid" style={{ gridTemplateColumns:"1fr 1fr", gap: 12 }}>
                <input className="input" placeholder="Phone *" value={customer.phone}
                       onChange={e=>setCustomer({ ...customer, phone: e.target.value })} />
                <input className="input" placeholder="Email (optional)" value={customer.email}
                       onChange={e=>setCustomer({ ...customer, email: e.target.value })} />
              </div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span />
                <button className="btn primary" onClick={()=>setStep(2)}>Next</button>
              </div>
            </div>
          )}

          {step===2 && (
            <div className="grid" style={{ gap: 12 }}>
              <input className="input" placeholder="Address line 1 *" value={address.line1}
                     onChange={e=>setAddress({ ...address, line1: e.target.value })} />
              <input className="input" placeholder="Address line 2 (optional)" value={address.line2}
                     onChange={e=>setAddress({ ...address, line2: e.target.value })} />
              <div className="grid" style={{ gridTemplateColumns:"1fr 1fr", gap: 12 }}>
                <input className="input" placeholder="City *" value={address.city}
                       onChange={e=>setAddress({ ...address, city: e.target.value })} />
                <input className="input" placeholder="State (optional)" value={address.state}
                       onChange={e=>setAddress({ ...address, state: e.target.value })} />
              </div>
              <input className="input" placeholder="Pincode *" value={address.pincode}
                     onChange={e=>setAddress({ ...address, pincode: e.target.value })} />
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <button className="btn ghost" onClick={()=>setStep(1)}>Back</button>
                <button className="btn primary" onClick={()=>setStep(3)}>Next</button>
              </div>
            </div>
          )}

          {step===3 && (
            <div className="grid" style={{ gap: 12 }}>
              <div className="card" style={{ padding: 14, background:"rgba(0,0,0,.18)" }}>
                <div style={{ fontWeight: 900 }}>Payment method</div>
                <div style={{ color:"var(--muted)", marginTop: 6 }}>
                  Demo supports COD + UPI selection (can extend to Razorpay integration).
                </div>
                <div style={{ display:"flex", gap: 10, marginTop: 12, flexWrap:"wrap" }}>
                  <button className={"btn " + (payment.method==="COD" ? "primary":"ghost")} onClick={()=>setPayment({ method:"COD" })}>Cash on Delivery</button>
                  <button className={"btn " + (payment.method==="UPI" ? "primary":"ghost")} onClick={()=>setPayment({ method:"UPI" })}>UPI</button>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <button className="btn ghost" onClick={()=>setStep(2)}>Back</button>
                <button className="btn primary" onClick={placeOrder}>Place Order</button>
              </div>

              {status.msg && (
                <div className="card" style={{
                  padding:"12px 14px",
                  outline: status.type === "ok" ? "1px solid rgba(57,217,138,.35)" : "1px solid rgba(255,91,91,.35)"
                }}>
                  <div style={{ fontWeight: 900, color: status.type === "ok" ? "var(--ok)" : "var(--danger)" }}>
                    {status.msg}
                  </div>
                  {status.orderId ? (
                    <div style={{ marginTop: 8, color:"var(--muted)" }}>
                      Order ID: <span style={{ color:"var(--text)", fontWeight: 900 }}>{status.orderId}</span>
                      <div style={{ marginTop: 10, display:"flex", gap:10, flexWrap:"wrap" }}>
                        <button className="btn" onClick={()=>nav(`/order/${status.orderId}`)}>View Order</button>
                        <button className="btn ghost" onClick={()=>nav("/shop")}>Back to Shop</button>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="card" style={{ padding: 16, height:"fit-content" }}>
          <div style={{ fontWeight: 900, fontSize: 18 }}>Summary</div>
          <div style={{ color:"var(--muted)", marginTop: 8 }}>{cart.length} item(s)</div>
          <div style={{ display:"grid", gap: 8, marginTop: 12, color:"var(--muted)" }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}><span>Subtotal</span><span>₹{totals.subtotal.toLocaleString("en-IN")}</span></div>
            <div style={{ display:"flex", justifyContent:"space-between" }}><span>Shipping</span><span>{totals.shipping === 0 ? "Free" : `₹${totals.shipping}`}</span></div>
            <div style={{ height: 1, background:"rgba(255,255,255,.08)", margin:"6px 0" }} />
            <div style={{ display:"flex", justifyContent:"space-between", color:"var(--text)", fontWeight: 900 }}>
              <span>Total</span><span>₹{totals.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
