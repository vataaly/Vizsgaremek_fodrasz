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

    /* 1. Alapvető mezők ellenőrzése */
    if (!user_id || !stylist_id || !service_id || !appointment_date || !start_time || !end_time) {
      return res.status(400).json({ message: "Minden mező kötelező" });
    }

    /* 2. Dátum és idő validálása (Ne lehessen múltbeli) */
    const now = new Date();
    const selectedDateTime = new Date(`${appointment_date}T${start_time}`);

    if (selectedDateTime < now) {
      return res.status(400).json({ message: "Nem foglalhatsz időpontot a múltba!" });
    }

    if (start_time >= end_time) {
      return res.status(400).json({ message: "A kezdési időnek kisebbnek kell lennie a végidőnél" });
    }

    /* 3. Ütközés ellenőrzés (Fodrász beosztásának védelme) */
    const [conflicts] = await db.query(
      `
      SELECT * FROM appointments 
      WHERE stylist_id = ? 
        AND appointment_date = ? 
        AND (
          (start_time <= ? AND end_time > ?) OR 
          (start_time < ? AND end_time >= ?) OR 
          (? <= start_time AND ? >= end_time)
        )
      `,
      [stylist_id, appointment_date, start_time, start_time, end_time, end_time, start_time, end_time]
    );

    if (conflicts.length > 0) {
      return res.status(409).json({ message: "Ez az időpont már foglalt ennél a fodrásznál" });
    }

    /* 4. Beszúrás az adatbázisba */
    await db.query(
      `
      INSERT INTO appointments 
      (user_id, stylist_id, service_id, appointment_date, start_time, end_time) 
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [user_id, stylist_id, service_id, appointment_date, start_time, end_time]
    );

    res.status(201).json({ message: "Időpont sikeresen lefoglalva" });
  } catch (err) {
    console.error("Hiba a foglalásnál:", err);
    res.status(500).json({ message: "Szerver hiba történt" });
  }
});

/* ===== 2. FELHASZNÁLÓ FOGLALÁSAINAK LEKÉRÉSE ===== */
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

/* ===== 3. FOGLALÁS TÖRLÉSE ===== */
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

/* ===== 4. ÖSSZES FOGLALÁS LEKÉRÉSE (ADMIN) ===== */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.appointment_id,
        a.appointment_date,
        a.start_time,
        a.end_time,
        u.name AS user_name,
        s.name AS stylist_name,
        srv.name AS service_name,
        srv.price AS service_price
      FROM appointments a
      JOIN users u ON a.user_id = u.user_id
      JOIN stylists s ON a.stylist_id = s.stylist_id
      JOIN services srv ON a.service_id = srv.service_id
      ORDER BY a.appointment_date DESC, a.start_time DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("Hiba az admin lekérésnél:", err);
    res.status(500).json({ message: "Szerver hiba történt" });
  }
});

/* ===== 5. FOGLALÁS MÓDOSÍTÁSA (PUT) ===== */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, stylist_id, service_id, appointment_date, start_time, end_time } = req.body;

    if (!user_id || !stylist_id || !service_id || !appointment_date || !start_time || !end_time) {
      return res.status(400).json({ message: "Minden mező kötelező" });
    }

    // Itt is érdemes ellenőrizni, hogy ne módosíthassák múltbeli dátumra
    const now = new Date();
    const selectedDateTime = new Date(`${appointment_date}T${start_time}`);
    if (selectedDateTime < now) {
      return res.status(400).json({ message: "Múltbeli időpontra nem módosíthatod a foglalást!" });
    }

    const [result] = await db.query(
      `UPDATE appointments 
       SET user_id = ?, stylist_id = ?, service_id = ?, appointment_date = ?, start_time = ?, end_time = ? 
       WHERE appointment_id = ?`,
      [user_id, stylist_id, service_id, appointment_date, start_time, end_time, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "A foglalás nem található" });
    }

    res.json({ message: "Foglalás sikeresen módosítva" });
  } catch (err) {
    console.error("Hiba a módosításnál:", err);
    res.status(500).json({ message: "Szerver hiba történt a módosítás során" });
  }
});

export default router;