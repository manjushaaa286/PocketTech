import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e){
    e.preventDefault();
    setError("");

    const u = username.trim();
    const p = password.trim();

    if (!u || !p){
      setError("Please enter username and password.");
      return;
    }

    // ✅ Username validation: must be @gmail.com
    const gmailOk = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(u);
    if (!gmailOk){
      setError("Username must be a valid @gmail.com address.");
      return;
    }

    // ✅ Password validation: must be a 10-digit mobile number (India: starts 6-9)
    // ✅ Strong password validation
const strongPwd =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!strongPwd.test(p)) {
  setError(
    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
  );
  return;
}


    sessionStorage.setItem("pt_logged_in", "true");

    // tell App.jsx to re-check auth and show Navbar
    window.dispatchEvent(new Event("pockettech:auth"));

    navigate("/", { replace: true });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "22px 16px",
        background:
          "radial-gradient(900px 520px at 20% 10%, rgba(65,140,255,.25), transparent 60%)," +
          "radial-gradient(700px 450px at 90% 25%, rgba(0,242,255,.14), transparent 55%)," +
          "linear-gradient(180deg, rgba(10,12,18,1), rgba(8,10,16,1))",
      }}
    >
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ display:"flex", alignItems:"center", gap: 12, marginBottom: 14 }}>
          <div
            className="card"
            style={{
              width: 44,
              height: 44,
              display: "grid",
              placeItems: "center",
              borderRadius: 14,
              outline: "1px solid rgba(65,140,255,.35)"
            }}
          >
            <span style={{ color:"var(--accent)", fontWeight: 900, fontSize: 18 }}>P</span>
          </div>
          <div>
            <div style={{ fontWeight: 900, letterSpacing: .2, fontSize: 18 }}>PocketTech</div>
            <div style={{ color:"var(--muted)", fontSize: 12, marginTop: 2 }}>
              Login to continue
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <h2 style={{ margin: 0, fontSize: 22 }}>Welcome back</h2>

          {error && (
            <div
              className="card"
              style={{
                marginTop: 12,
                padding: "12px 14px",
                outline: "1px solid rgba(255,91,91,.35)",
                background: "rgba(255,91,91,.08)"
              }}
            >
              <div style={{ fontWeight: 900, color: "var(--danger)" }}>{error}</div>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ marginTop: 14, display: "grid", gap: 12 }}>
            <div>
              <div style={{ marginBottom: 6, color: "var(--muted)", fontSize: 12 }}>
                Username (Email)
              </div>
              <input
                className="input"
                placeholder="Enter email"
                value={username}
                onChange={e=>setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div>
              <div style={{ marginBottom: 6, color: "var(--muted)", fontSize: 12 }}>
                Password
              </div>
              <input
                className="input"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button className="btn primary" type="submit" style={{ width: "100%", marginTop: 4 }}>
              Login
            </button>
          </form>
        </div>

        <div style={{ marginTop: 14, color:"var(--muted)", fontSize: 12, textAlign:"center" }}>
          © {new Date().getFullYear()} PocketTech
        </div>
      </div>
    </div>
  );
}
