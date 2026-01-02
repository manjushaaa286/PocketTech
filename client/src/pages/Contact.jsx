import { useState } from "react";

export default function Contact() {

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState({ type: "", msg: "" });

  // QUESTION 5: show / hide section
  const [showSection, setShowSection] = useState(true);

  function toggleSection() {
    setShowSection(!showSection);
  }

  async function submit(e) {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus({ type: "err", msg: data?.message || "Failed to send." });
      return;
    }

    setStatus({ type: "ok", msg: "Message successfully sent." });
    setForm({ fullName: "", email: "", message: "" });
  }

  return (
    <div className="container" style={{ padding: "22px 18px 40px", maxWidth: 760 }}>
      <div className="pill">Contact</div>
      <h2 style={{ margin: "10px 0 0", fontSize: 30 }}>Get in touch</h2>

      {/* QUESTION 5 BUTTON */}
      <button
        type="button"
        className="btn"
        onClick={toggleSection}
        style={{ marginTop: 12 }}
      >
        {showSection ? "Hide Section" : "Show Section"}
      </button>

      {/* QUESTION 5 SECTION */}
      {showSection && (
        <div className="card" style={{ padding: 12, marginTop: 12 }}>
          <p>This section can be shown or hidden.</p>
        </div>
      )}

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
