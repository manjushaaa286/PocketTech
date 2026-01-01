import { Link } from "react-router-dom";

export default function NotFound(){
  return (
    <div className="container" style={{ padding:"40px 18px" }}>
      <div className="card" style={{ padding: 18 }}>
        <div style={{ fontWeight: 900, fontSize: 18 }}>Page not found</div>
        <div style={{ color:"var(--muted)", marginTop: 8 }}>Go back to the home page.</div>
        <div style={{ marginTop: 12 }}>
          <Link to="/" className="btn primary">Home</Link>
        </div>
      </div>
    </div>
  );
}
