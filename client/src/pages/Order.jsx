import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Order(){
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();
      if (!res.ok) { setErr(data?.message || "Not found"); return; }
      setOrder(data);
    })();
  }, [id]);

  return (
    <div className="container" style={{ padding:"22px 18px 40px", maxWidth: 920 }}>
      <div className="pill">Order</div>
      <h2 style={{ margin:"10px 0 0", fontSize: 30 }}>Order Details</h2>
      <div style={{ color:"var(--muted)", marginTop:6 }}>Order ID: {id}</div>

      {err ? <div className="card" style={{ padding: 16, marginTop: 16 }}>{err}</div> : null}

      {order ? (
        <div className="grid" style={{ gap: 14, marginTop: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 900 }}>Status: <span style={{ color:"var(--accent)" }}>{order.status}</span></div>
            <div style={{ color:"var(--muted)", marginTop: 6 }}>Placed at: {new Date(order.createdAt).toLocaleString()}</div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 900 }}>Customer</div>
            <div style={{ color:"var(--muted)", marginTop: 6 }}>{order.customer.fullName} • {order.customer.phone}</div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 900 }}>Delivery Address</div>
            <div style={{ color:"var(--muted)", marginTop: 6 }}>
              {order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ""}, {order.address.city} - {order.address.pincode}
            </div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 900 }}>Items</div>
            <div className="grid" style={{ gap: 10, marginTop: 10 }}>
              {order.items.map(it => (
                <div key={it.id} className="card" style={{ padding: 12, background:"rgba(0,0,0,.18)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", gap: 10 }}>
                    <div style={{ fontWeight: 800 }}>{it.name}</div>
                    <div style={{ color:"var(--muted)" }}>x{it.qty}</div>
                  </div>
                  <div style={{ color:"var(--muted)", marginTop: 4 }}>₹{Number(it.price).toLocaleString("en-IN")}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
