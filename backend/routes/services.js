import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM services");
    res.json(rows);
  } catch (error) {
    console.error("SERVICES HIBA:", error);
    res.status(500).json({ message: "Adatbázis hiba", error: error.message });
  }
});

export default router;