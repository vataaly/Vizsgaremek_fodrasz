import express from "express";
import { db } from "../db.js";

const router = express.Router();

/* ===== 1. ÚJ IDŐPONT FOGLALÁSA (POST) ===== */
router.post("/", async (req, res) => {
  try {
    const { user_id, stylist_id, service_id, appointment_date, start_time, end_time } = req.body;

    if (!user_id || !stylist_id || !service_id || !appointment_date || !start_time || !end_time) {
      return res.status(400).json({ message: "Minden mező kötelező" });
    }

    const now = new Date();
    const selectedDateTime = new Date(`${appointment_date}T${start_time}`);
    if (selectedDateTime < now) {
      return res.status(400).json({ message: "Nem foglalhatsz időpontot a múltba!" });
    }

    /* Ütközés ellenőrzés */
    const [conflicts] = await db.query(
      `SELECT * FROM appointments 
       WHERE stylist_id = ? AND appointment_date = ? 
       AND ((start_time <= ? AND end_time > ?) OR (start_time < ? AND end_time >= ?) OR (? <= start_time AND ? >= end_time))`,
      [stylist_id, appointment_date, start_time, start_time, end_time, end_time, start_time, end_time]
    );

    if (conflicts.length > 0) {
      return res.status(409).json({ message: "Ez az időpont már foglalt ennél a fodrásznál!" });
    }

    await db.query(
      "INSERT INTO appointments (user_id, stylist_id, service_id, appointment_date, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, stylist_id, service_id, appointment_date, start_time, end_time]
    );

    res.status(201).json({ message: "Időpont sikeresen lefoglalva" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Szerver hiba történt" });
  }
});

/* ===== 2. LEKÉRÉS (SZŰRT VAGY ÖSSZES) ===== */
router.get("/", async (req, res) => {
  try {
    const { date, stylistId } = req.query;

    // Ha van szűrés (Foglaló oldalhoz)
    if (date && stylistId) {
      const [rows] = await db.query(
        "SELECT start_time, end_time FROM appointments WHERE appointment_date = ? AND stylist_id = ?",
        [date, stylistId]
      );
      return res.json(rows);
    }

    // Alapértelmezett: Összes foglalás (Admin oldalhoz)
    const [rows] = await db.query(`
      SELECT a.*, u.name AS user_name, s.name AS stylist_name, srv.name AS service_name 
      FROM appointments a
      JOIN users u ON a.user_id = u.user_id
      JOIN stylists s ON a.stylist_id = s.stylist_id
      JOIN services srv ON a.service_id = srv.service_id
      ORDER BY a.appointment_date DESC, a.start_time DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Hiba a lekérés során" });
  }
});

/* ===== 3. FELHASZNÁLÓ SAJÁT FOGLALÁSAI ===== */
router.get("/user/:userId", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT a.*, s.name AS stylist_name, srv.name AS service_name, srv.price AS service_price
       FROM appointments a
       JOIN stylists s ON a.stylist_id = s.stylist_id
       JOIN services srv ON a.service_id = srv.service_id
       WHERE a.user_id = ? ORDER BY a.appointment_date DESC`,
      [req.params.userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Hiba történt" });
  }
});

/* ===== 4. TÖRLÉS ===== */
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM appointments WHERE appointment_id = ?", [req.params.id]);
    res.json({ message: "Foglalás törölve" });
  } catch (err) {
    res.status(500).json({ message: "Hiba a törlésnél" });
  }
});

/* ===== 5. MÓDOSÍTÁS ===== */
router.put("/:id", async (req, res) => {
  try {
    const { user_id, stylist_id, service_id, appointment_date, start_time, end_time } = req.body;
    await db.query(
      `UPDATE appointments SET user_id=?, stylist_id=?, service_id=?, appointment_date=?, start_time=?, end_time=? WHERE appointment_id=?`,
      [user_id, stylist_id, service_id, appointment_date, start_time, end_time, req.params.id]
    );
    res.json({ message: "Sikeres módosítás" });
  } catch (err) {
    res.status(500).json({ message: "Hiba a módosításnál" });
  }
});

export default router;