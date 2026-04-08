import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Összes fodrász lekérése (GET)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM stylists");
    res.json(rows);
  } catch (error) {
    console.error("STYLISTS GET HIBA:", error);
    res.status(500).json({
      message: "Adatbázis hiba a lekérdezésnél",
      error: error.message,
    });
  }
});

// Új fodrász hozzáadása (POST)
router.post('/', async (req, res) => {
  // Az adatok kinyerése a beérkező kérésből
  const { name, specialization, email, phone } = req.body;

  // Ellenőrizzük, hogy minden kötelező adat megérkezett-e
  if (!name || !specialization || !email || !phone) {
    return res.status(400).json({ message: "Minden mezőt kötelező kitölteni!" });
  }

  try {
    const sql = "INSERT INTO stylists (name, specialization, email, phone) VALUES (?, ?, ?, ?)";
    
    // Promise alapú query hívás (mint a GET-nél)
    const [result] = await db.query(sql, [name, specialization, email, phone]);
    
    res.status(201).json({ 
      message: "Fodrász sikeresen hozzáadva!", 
      insertId: result.insertId 
    });
  } catch (error) {
    console.error("STYLISTS POST HIBA:", error);
    res.status(500).json({
      message: "Adatbázis hiba a mentés során",
      error: error.message,
    });
  }
});

// Fodrász adatainak módosítása (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, specialization, email, phone } = req.body;

  if (!name || !specialization || !email || !phone) {
    return res.status(400).json({ message: "Minden mezőt kötelező kitölteni!" });
  }

  try {
    const sql = "UPDATE stylists SET name = ?, specialization = ?, email = ?, phone = ? WHERE stylist_id = ?";
    const [result] = await db.query(sql, [name, specialization, email, phone, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "A megadott fodrász nem található." });
    }

    res.json({ message: "Fodrász sikeresen frissítve!" });
  } catch (error) {
    console.error("STYLISTS PUT HIBA:", error);
    res.status(500).json({
      message: "Adatbázis hiba a frissítés során",
      error: error.message,
    });
  }
});

// Fodrász törlése (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sql = "DELETE FROM stylists WHERE stylist_id = ?";
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "A megadott fodrász nem található." });
    }

    res.json({ message: "Fodrász sikeresen törölve!" });
  } catch (error) {
    console.error("STYLISTS DELETE HIBA:", error);
    res.status(500).json({
      message: "Adatbázis hiba a törlés során",
      error: error.message,
    });
  }
});

export default router;