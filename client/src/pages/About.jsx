import { Link } from "react-router-dom";

export default function About(){
  return (
    <div className="container" style={{ padding:"22px 18px 40px", maxWidth: 900 }}>
      <div className="pill">About</div>
      <h2 style={{ margin:"10px 0 0", fontSize: 30 }}>About PocketTech</h2>
      <div style={{ color:"var(--muted)", marginTop:6, lineHeight:1.7 }}>
        PocketTech is a modern marketplace for verified pre-owned electronics — mobiles, laptops, tablets and accessories.
        Each device is listed with transparent condition grading, pricing, and offers like discounts and EMI options.
      </div>

      <div className="grid" style={{ gridTemplateColumns:"1fr 1fr", gap: 16, marginTop: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900, fontSize: 18 }}>What we do</div>
          <ul style={{ color:"var(--muted)", marginTop: 10, lineHeight:1.8 }}>
          PocketTech is a modern web-based platform designed to provide a safe, reliable, and user-friendly environment for buying and selling verified pre-owned electronic devices such as smartphones, laptops, tablets, accessories, and wearables.

The platform curates a wide range of devices with clear product images, detailed specifications, condition grading, and verified quality checks, helping users make informed purchasing decisions. A smooth and efficient checkout process is implemented, allowing users to manage their cart, view pricing details, apply discounts, explore EMI options, and receive order confirmation seamlessly.

In addition to buying devices, PocketTech also enables users to sell their pre-owned devices by submitting product details along with images. This feature makes the platform interactive and demonstrates a real-world two-sided marketplace model.
          </ul>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900, fontSize: 18 }}>About me</div>
          <div style={{ color:"var(--muted)", marginTop: 10, lineHeight:1.8 }}>
            Hello! My name is Ganitham Manjusha, and I am currently a 2nd-year Computer Science student at Dayananda Sagar College of Engineering, Bangalore.

I developed this project with the aim of creating a safe, reliable, and user-friendly platform where people can buy and sell verified pre-owned electronic devices with confidence.

Through this project, I explored how modern e-commerce websites work, including product listings, detailed product views, cart and checkout flow, and backend data handling. It also helped me gain hands-on experience with full-stack web development concepts.

If you would like to know more about the project or get in touch, please feel free to use the Contact page.
          </div>
    <div style={{ marginTop: 104 }}>
  <button className="btn primary">Contact Me!</button>
</div>

        </div>
      </div>
    </div>
  );
}
