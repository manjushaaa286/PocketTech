import { useState } from "react";

export default function Sell(){
  const [form, setForm] = useState({
    name:"", brand:"", category:"Mobiles", expectedPrice:"", condition:"Good", notes:""
  });
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState({ type:"", msg:"" });

  async function submit(e){
    e.preventDefault();
    setStatus({ type:"", msg:"" });
    const fd = new FormData();
    Object.entries(form).forEach(([k,v]) => fd.append(k, v));
    if (photo) fd.append("photo", photo);

    const res = await fetch("/api/sell", { method:"POST", body: fd });
    const data = await res.json();
    if (!res.ok) {
      setStatus({ type:"err", msg: data?.message || "Failed to submit." });
      return;
    }
    setStatus({ type:"ok", msg:"Submitted successfully. Our team will review and contact you." });
    setForm({ name:"", brand:"", category:"Mobiles", expectedPrice:"", condition:"Good", notes:"" });
    setPhoto(null);
    const el = document.getElementById("photo-input");
    if (el) el.value = "";
  }

  return (
    <div className="container" style={{ padding:"22px 18px 40px" }}>
      <div className="pill">Sell Device</div>
      <h2 style={{ margin:"10px 0 0", fontSize: 30 }}>Upload your device with photo</h2>
      <div style={{ color:"var(--muted)", marginTop:6 }}>Your submission is stored on the Node.js server.</div>

      <div className="card" style={{ padding: 18, marginTop: 16, maxWidth: 720 }}>
        <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
          <div className="grid" style={{ gridTemplateColumns:"1fr 1fr", gap: 12 }}>
            <input className="input" placeholder="Device name (required)" value={form.name}
                   onChange={e=>setForm({ ...form, name: e.target.value })} />
            <input className="input" placeholder="Brand (optional)" value={form.brand}
                   onChange={e=>setForm({ ...form, brand: e.target.value })} />
          </div>

          <div className="grid" style={{ gridTemplateColumns:"1fr 1fr 1fr", gap: 12 }}>
            <select className="input" value={form.category} onChange={e=>setForm({ ...form, category: e.target.value })}>
              <option>Mobiles</option>
              <option>Laptops</option>
              <option>Tablets</option>
              <option>Accessories</option>
              <option>Wearables</option>
              <option>Other</option>
            </select>
            <select className="input" value={form.condition} onChange={e=>setForm({ ...form, condition: e.target.value })}>
              <option>Excellent</option>
              <option>Very Good</option>
              <option>Good</option>
            </select>
            <input className="input" type="number" min="0" placeholder="Expected price (₹) (required)" value={form.expectedPrice}
                   onChange={e=>setForm({ ...form, expectedPrice: e.target.value })} />
          </div>

          <textarea className="input" rows="4" placeholder="Notes (optional)" value={form.notes}
                    onChange={e=>setForm({ ...form, notes: e.target.value })} />

          <div className="card" style={{ padding: 14, background:"rgba(0,0,0,.18)" }}>
            <div style={{ fontWeight: 800 }}>Add photos</div>
            <div style={{ color:"var(--muted)", fontSize: 13, marginTop: 6 }}>Upload 1 image (max 3MB). Stored in server/uploads.</div>
            <input id="photo-input" className="input" style={{ marginTop: 10 }} type="file" accept="image/*"
                   onChange={e=>setPhoto(e.target.files?.[0] || null)} />
          </div>

          <button className="btn primary" type="submit">Submit for Verification</button>

          {status.msg && (
            <div className="card" style={{
              padding:"12px 14px",
              outline: status.type === "ok" ? "1px solid rgba(57,217,138,.35)" : "1px solid rgba(255,91,91,.35)"
            }}>
              <div style={{ fontWeight: 800, color: status.type === "ok" ? "var(--ok)" : "var(--danger)" }}>
                {status.msg}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
