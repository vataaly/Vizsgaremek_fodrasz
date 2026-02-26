import express from "express";
import { db } from "../db.js";

const router = express.Router();

/* ===== 1. ÚJ IDŐPONT FOGLALÁSA (POST) ===== */
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

    /* Validálás */
    if (!user_id || !stylist_id || !service_id || !appointment_date || !start_time || !end_time) {
      return res.status(400).json({ message: "Minden mező kötelező" });
    }

    if (start_time >= end_time) {
      return res.status(400).json({ message: "A kezdési időnek kisebbnek kell lennie a végidőnél" });
    }

    /* Ütközés ellenőrzés a fodrásznál */
    const [conflicts] = await db.query(
      `
      SELECT * FROM appointments 
      WHERE stylist_id = ? 
        AND appointment_date = ? 
        AND (
          (start_time < ? AND end_time > ?) OR 
          (start_time < ? AND end_time > ?) OR 
          (start_time >= ? AND end_time <= ?)
        )
      `,
      [stylist_id, appointment_date, end_time, start_time, end_time, start_time, start_time, end_time]
    );

    if (conflicts.length > 0) {
      return res.status(409).json({ message: "Ez az időpont már foglalt ennél a fodrásznál" });
    }

    /* Beszúrás */
    await db.query(
      `
      INSERT INTO appointments 
      (appointment_id, user_id, stylist_id, service_id, appointment_date, start_time, end_time) 
      VALUES (NULL, ?, ?, ?, ?, ?, ?)
      `,
      [user_id, stylist_id, service_id, appointment_date, start_time, end_time]
    );

    res.status(201).json({ message: "Időpont sikeresen lefoglalva" });
  } catch (err) {
    console.error("Hiba a foglalásnál:", err);
    res.status(500).json({ message: "Szerver hiba történt" });
  }
});

/* ===== 2. FELHASZNÁLÓ FOGLALÁSAINAK LEKÉRÉSE (GET) ===== */
/* Itt lekérjük a fodrász nevét, a szolgáltatás nevét és az ÁRAT is */
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const [rows] = await db.query(
      `
      SELECT 
        a.appointment_id, 
        a.appointment_date, 
        a.start_time, 
        a.end_time, 
        s.name AS stylist_name, 
        srv.name AS service_name,
        srv.price AS service_price
      FROM appointments a
      JOIN stylists s ON a.stylist_id = s.stylist_id
      JOIN services srv ON a.service_id = srv.service_id
      WHERE a.user_id = ?
      ORDER BY a.appointment_date DESC, a.start_time DESC
      `,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error("Hiba a lekérésnél:", err);
    res.status(500).json({ message: "Szerver hiba történt a lekérés során" });
  }
});

/* ===== 3. FOGLALÁS TÖRLÉSE / LEMONDÁSA (DELETE) ===== */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM appointments WHERE appointment_id = ?", 
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "A foglalás nem található" });
    }

    res.json({ message: "Foglalás sikeresen törölve" });
  } catch (err) {
    console.error("Hiba a törlésnél:", err);
    res.status(500).json({ message: "Szerver hiba történt a törlés során" });
  }
});

export default router;