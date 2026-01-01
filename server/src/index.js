import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: [/^http:\/\/localhost:(5173|5174|5175)$/], credentials: false }));
app.use(express.json({ limit: "2mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, "..", "data");
const uploadsDir = path.resolve(__dirname, "..", "uploads");

function readJson(fileName, fallback) {
  try { return JSON.parse(fs.readFileSync(path.join(dataDir, fileName), "utf-8")); }
  catch { return fallback; }
}
function writeJson(fileName, data) {
  fs.writeFileSync(path.join(dataDir, fileName), JSON.stringify(data, null, 2));
}

app.use("/uploads", express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "") || ".png";
    cb(null, `${Date.now()}_${nanoid(8)}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 3 * 1024 * 1024 } });

app.get("/api/health", (req, res) => res.json({ ok: true, port: PORT }));

app.get("/api/products", (req, res) => {
  const q = (req.query.q || "").toString().toLowerCase();
  const category = (req.query.category || "").toString();
  const products = readJson("products.json", []);
  let out = products;

  if (category) out = out.filter(p => p.category === category);
  if (q) out = out.filter(p =>
    (p.name||"").toLowerCase().includes(q) ||
    (p.brand||"").toLowerCase().includes(q) ||
    (p.category||"").toLowerCase().includes(q)
  );
  res.json(out);
});
app.get("/api/products/:id", (req, res) => {
  const products = readJson("products.json", []);
  const item = products.find(p => p.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Product not found." });
  res.json(item);
});


app.post("/api/sell", upload.single("photo"), (req, res) => {
  const { name, brand, category, expectedPrice, condition, notes } = req.body;
  if (!name || !expectedPrice) return res.status(400).json({ message: "Device name and expected price are required." });

  const sellRequests = readJson("sell_requests.json", []);
  const record = {
    id: `s_${nanoid(10)}`,
    name,
    brand: brand || "",
    category: category || "Mobiles",
    expectedPrice: Number(expectedPrice),
    condition: condition || "Good",
    notes: notes || "",
    photo: req.file ? `/uploads/${req.file.filename}` : "",
    createdAt: new Date().toISOString()
  };
  sellRequests.unshift(record);
  writeJson("sell_requests.json", sellRequests);
  res.json({ ok: true, record });
});

app.post("/api/contact", async (req, res) =>{
  const { fullName, email, message } = req.body || {};
  if (!fullName || !email || !message) return res.status(400).json({ message: "Full name, email and message are required." });

  const contacts = readJson("contacts.json", []);
  contacts.unshift({ id: `c_${nanoid(10)}`, fullName, email, message, createdAt: new Date().toISOString() });
  writeJson("contacts.json", contacts);


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

await transporter.sendMail({
  from: process.env.GMAIL_USER,
  to: "manjushaganitham789@gmail.com",
  subject: "New PocketTech Contact Message",
  text: `Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`,
});

  res.json({ ok: true });
});

app.post("/api/orders", (req, res) => {
  const { items, customer, address, payment } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: "Cart is empty." });
  if (!customer?.fullName || !customer?.phone) return res.status(400).json({ message: "Customer name and phone are required." });
  if (!address?.line1 || !address?.city || !address?.pincode) return res.status(400).json({ message: "Address is incomplete." });

  const orders = readJson("orders.json", []);
  const order = {
    id: `o_${nanoid(10)}`,
    items,
    customer,
    address,
    payment: payment || { method: "COD" },
    status: "PLACED",
    createdAt: new Date().toISOString()
  };
  orders.unshift(order);
  writeJson("orders.json", orders);
  res.json({ ok: true, orderId: order.id });
});

app.get("/api/orders/:id", (req, res) => {
  const orders = readJson("orders.json", []);
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found." });
  res.json(order);
});

app.listen(PORT, () => console.log(`PocketTech server running on http://localhost:${PORT}`));
