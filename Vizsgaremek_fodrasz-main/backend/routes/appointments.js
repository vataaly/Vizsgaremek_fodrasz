import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      stylist_id,
      service_id,
      appointment_date,
      start_time,
      end_time,
    } = req.body;

    if (!user_id || !stylist_id || !service_id || !appointment_date || !start_time || !end_time) {
      return res.status(400).json({ message: "Minden mező kötelező" });
    }

    if (start_time >= end_time) {
      return res.status(400).json({ message: "A kezdési időnek kisebbnek kell lennie a végidőnél" });
    }

    const [conflicts] = await db.query(
      `
      SELECT appointment_id FROM appointments
      WHERE stylist_id = ?
        AND appointment_date = ?
        AND (start_time < ? AND end_time > ?)
      `,
      [stylist_id, appointment_date, end_time, start_time]
    );

    if (conflicts.length > 0) {
      return res.status(409).json({ message: "Ez az időpont már foglalt ennél a fodrásznál" });
    }

    await db.query(
      `
      INSERT INTO appointments
      (user_id, stylist_id, service_id, appointment_date, start_time, end_time)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [user_id, stylist_id, service_id, appointment_date, start_time, end_time]
      
    );

    return res.status(201).json({ message: "Időpont sikeresen lefoglalva" });
  } catch (err) {
    console.error("Appointment error:", err);
    return res.status(500).json({ message: err.message });
  }
});

export default router;