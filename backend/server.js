import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "csci426",
  port: Number(process.env.DB_PORT || 3306),
});

db.getConnection((err, conn) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Database connected");
    conn.release();
  }
});

function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").toLowerCase());
}

function adminAuth(req) {
  const u = req.headers["admin-username"];
  const p = req.headers["admin-password"];
  const au = process.env.ADMIN_USERNAME || "admin";
  const ap = process.env.ADMIN_PASSWORD || "admin123";
  return u === au && p === ap;
}

app.get("/", (req, res) => {
  res.json({ message: "BookFlow API running" });
});

app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  const au = process.env.ADMIN_USERNAME || "admin";
  const ap = process.env.ADMIN_PASSWORD || "admin123";

  if (username === au && password === ap) {
    return res.json({ message: "Admin login successful" });
  }

  return res.status(401).json({ message: "Invalid admin credentials" });
});

app.post("/register", (req, res) => {
  const { fullName, email, password } = req.body;

  const errors = [];
  if (!fullName) errors.push("Full name is required");
  if (!email) errors.push("Email is required");
  if (email && !isEmail(email)) errors.push("Invalid email format");
  if (!password) errors.push("Password is required");
  if (password && String(password).length < 6) errors.push("Password must be at least 6 characters");

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  const checkQ = "SELECT id FROM users WHERE email = ?";
  db.query(checkQ, [email], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    if (rows.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const q = "INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)";
    db.query(q, [fullName, email, password], (err2, result) => {
      if (err2) return res.status(500).json({ message: "Database error", error: err2 });

      return res.status(201).json({ message: "User registered", id: result.insertId });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const errors = [];
  if (!email) errors.push("Email is required");
  if (email && !isEmail(email)) errors.push("Invalid email format");
  if (!password) errors.push("Password is required");

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  const q = "SELECT id, fullName, email FROM users WHERE email = ? AND password = ?";
  db.query(q, [email, password], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json({ message: "Login successful", user: rows[0] });
  });
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books ORDER BY id ASC";
  db.query(q, (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    return res.json(rows);
  });
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM books WHERE id = ?";
  db.query(q, [id], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (rows.length === 0) return res.status(404).json({ message: "Book not found" });
    return res.json(rows[0]);
  });
});

app.post("/books", (req, res) => {
  if (!adminAuth(req)) return res.status(401).json({ message: "Admin unauthorized" });

  const { title, author, price, category, cover, description } = req.body;

  const errors = [];
  if (!title) errors.push("Title is required");
  if (!author) errors.push("Author is required");
  if (price === undefined || price === null || price === "") errors.push("Price is required");
  if (Number.isNaN(Number(price))) errors.push("Price must be a number");
  if (!category) errors.push("Category is required");
  if (!cover) errors.push("Cover URL is required");
  if (!description) errors.push("Description is required");

  if (errors.length > 0) return res.status(400).json({ message: errors });

  const q =
    "INSERT INTO books (title, author, price, category, cover, description) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(q, [title, author, Number(price), category, cover, description], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    return res.status(201).json({ message: "Book created", id: result.insertId });
  });
});

app.put("/books/:id", (req, res) => {
  if (!adminAuth(req)) return res.status(401).json({ message: "Admin unauthorized" });

  const { id } = req.params;
  const { title, author, price, category, cover, description } = req.body;

  const errors = [];
  if (!title) errors.push("Title is required");
  if (!author) errors.push("Author is required");
  if (price === undefined || price === null || price === "") errors.push("Price is required");
  if (Number.isNaN(Number(price))) errors.push("Price must be a number");
  if (!category) errors.push("Category is required");
  if (!cover) errors.push("Cover URL is required");
  if (!description) errors.push("Description is required");

  if (errors.length > 0) return res.status(400).json({ message: errors });

  const q =
    "UPDATE books SET title = ?, author = ?, price = ?, category = ?, cover = ?, description = ? WHERE id = ?";
  db.query(q, [title, author, Number(price), category, cover, description, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Book not found" });
    return res.json({ message: "Book updated" });
  });
});

app.delete("/books/:id", (req, res) => {
  if (!adminAuth(req)) return res.status(401).json({ message: "Admin unauthorized" });

  const { id } = req.params;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Book not found" });
    return res.json({ message: "Book deleted" });
  });
});

app.post("/orders", (req, res) => {
  const { userID, total } = req.body;

  const errors = [];
  if (!userID) errors.push("userID is required");
  if (total === undefined || total === null || total === "") errors.push("total is required");
  if (Number.isNaN(Number(total))) errors.push("total must be a number");

  if (errors.length > 0) return res.status(400).json({ message: errors });

  const q = "INSERT INTO orders (userID, total) VALUES (?, ?)";
  db.query(q, [userID, Number(total)], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    return res.status(201).json({ message: "Order created", id: result.insertId });
  });
});

app.get("/orders", (req, res) => {
  const q = "SELECT * FROM orders ORDER BY id DESC";
  db.query(q, (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    return res.json(rows);
  });
});

app.get("/orders/user/:userID", (req, res) => {
  const { userID } = req.params;
  const q = "SELECT * FROM orders WHERE userID = ? ORDER BY id DESC";
  db.query(q, [userID], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    return res.json(rows);
  });
});

app.delete("/orders/:id", (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM orders WHERE id = ?";
  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });
    return res.json({ message: "Order deleted" });
  });
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const errors = [];
  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  if (email && !isEmail(email)) errors.push("Invalid email format");
  if (!message) errors.push("Message is required");

  if (errors.length > 0) return res.status(400).json({ message: errors });

  const q = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
  db.query(q, [name, email, message], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    return res.status(201).json({ message: "Message sent successfully", id: result.insertId });
  });
});

const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
