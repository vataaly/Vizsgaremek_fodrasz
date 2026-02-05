import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM users");
  res.json(rows);
});

router.post("/register", async (req, res) => {
  const { name, email, phone } = req.body;

  await db.query(
    "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
    [name, email, phone]
  );

  res.json({ message: "Sikeres regisztráció" });
});

export default router;
