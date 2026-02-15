import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port:process.env.DB_port,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// Health check
app.get("/api/health", async (req, res) => {
  const [rows] = await pool.query("SELECT 1 AS ok");
  res.json({ ok: rows[0].ok });
});

//
// PRODUCTS
//

// Get all products
app.get("/api/products", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM products ORDER BY id DESC");
  res.json(rows);
});

// Add product
app.post("/api/products", async (req, res) => {
  const { name, price, unit } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "name is required" });
  }
  if (typeof price !== "number") {
    return res.status(400).json({ message: "price must be a number" });
  }
  if (!["kg", "piece"].includes(unit)) {
    return res.status(400).json({ message: "unit must be 'kg' or 'piece'" });
  }

  const [result] = await pool.query(
    "INSERT INTO products (name, price, unit) VALUES (?, ?, ?)",
    [name.trim(), price, unit]
  );

  res.status(201).json({ id: result.insertId, name: name.trim(), price, unit });
});

//
// BILLS
//

// Save bill
// body: { items: [{ productId, quantity, price }], totalAmount }
app.post("/api/bills", async (req, res) => {
  const { items, totalAmount } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "items are required" });
  }
  if (typeof totalAmount !== "number") {
    return res.status(400).json({ message: "totalAmount must be a number" });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [billResult] = await conn.query(
      "INSERT INTO bills (total_amount) VALUES (?)",
      [totalAmount]
    );

    const billId = billResult.insertId;

    const values = items.map((it) => [billId, it.productId, it.quantity, it.price]);

    await conn.query(
      "INSERT INTO bill_items (bill_id, product_id, quantity, price) VALUES ?",
      [values]
    );

    await conn.commit();
    res.status(201).json({ message: "Bill saved", billId });
  } catch (e) {
    await conn.rollback();
    res.status(500).json({ message: e.message });
  } finally {
    conn.release();
  }
});

// Bills list
app.get("/api/bills", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id, bill_date, total_amount FROM bills ORDER BY id DESC"
  );
  res.json(rows);
});

// Bill details
app.get("/api/bills/:id", async (req, res) => {
  const billId = Number(req.params.id);

  const [billRows] = await pool.query(
    "SELECT id, bill_date, total_amount FROM bills WHERE id=?",
    [billId]
  );
  if (billRows.length === 0) return res.status(404).json({ message: "Not found" });

  const [items] = await pool.query(
    `SELECT bi.quantity, bi.price, p.name, p.unit
     FROM bill_items bi
     JOIN products p ON p.id = bi.product_id
     WHERE bi.bill_id = ?`,
    [billId]
  );

  res.json({ bill: billRows[0], items });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend running on http://localhost:${process.env.PORT || 5000}`);
});
