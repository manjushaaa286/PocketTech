import { useState } from "react";

export default function Contact() {

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState({ type: "", msg: "" });

  // 5

async function submit(e) {
  e.preventDefault();
  setStatus({ type: "", msg: "" });

  // quick client-side required validation (prevents 400)
  if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
    setStatus({ type: "err", msg: "Please fill Full name, Email and Message." });
    return;
  }

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const text = await res.text();        // read raw response safely
    let data = {};
    try { data = JSON.parse(text); } catch {}

    if (!res.ok) {
      setStatus({ type: "err", msg: data?.message || `Failed to send (HTTP ${res.status}).` });
      return;
    }

  setStatus({ type: "ok", msg: "Message successfully sent." });

    setForm({ fullName: "", email: "", message: "" });

  } catch (err) {
    setStatus({ type: "err", msg: "Network error: server not reachable." });
  }
}


  return (
    <div className="container" style={{ padding: "22px 18px 40px", maxWidth: 760 }}>
      <div className="pill">Contact</div>
      <h2 style={{ margin: "10px 0 0", fontSize: 30 }}>Get in touch</h2>


      <div className="card" style={{ padding: 18, marginTop: 16 }}>
        <form onSubmit={submit} className="grid" style={{ gap: 12 }}>

          <input
            className="input"
            placeholder="Full name *"
            value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
          />

          <input
            className="input"
            placeholder="Email *"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <textarea
            className="input"
            rows="5"
            placeholder="Message *"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
          />

          <button className="btn primary" type="submit">
            Send Message
          </button>

          {status.msg && (
            <div
              className="card"
              style={{
                padding: "12px 14px",
                outline:
                  status.type === "ok"
                    ? "1px solid rgba(57,217,138,.35)"
                    : "1px solid rgba(255,91,91,.35)"
              }}
            >
              <div
                style={{
                  fontWeight: 900,
                  color: status.type === "ok"
                    ? "var(--ok)"
                    : "var(--danger)"
                }}
              >
                {status.msg}
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
