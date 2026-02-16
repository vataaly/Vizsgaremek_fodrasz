import express from "express";
import bcrypt from "bcrypt";
import { db } from "../db.js";

const router = express.Router();

/**
 * GET /api/users
 * (opcionális) felhasználók listája - jelszó nélkül!
 */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT user_id, name, email, phone, created_at FROM users"
    );
    res.json(rows);
  } catch (err) {
    console.error("USERS GET ERROR:", err);
    res.status(500).json({ message: "Szerver hiba történt." });
  }
});

/**
 * POST /api/users/register
 * body: { email, password, name?, phone? }
 */
router.post("/register", async (req, res) => {
  try {
    let { name, email, phone, password } = req.body;

    // validálás
    if (!email || !password) {
      return res.status(400).json({ message: "Az email és a jelszó kötelező." });
    }

    // name NOT NULL miatt: ha nincs name, legyen az email
    name = (name && name.trim()) ? name.trim() : email;
    phone = (phone && phone.trim()) ? phone.trim() : null;

    // email létezik?
    const [exists] = await db.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );
    if (exists.length > 0) {
      return res.status(409).json({ message: "Már létezik fiók ezzel az emaillel." });
    }

    // jelszó hash
    const passwordHash = await bcrypt.hash(password, 10);

    // mentés
    const [result] = await db.query(
      "INSERT INTO users (name, email, password_hash, phone) VALUES (?, ?, ?, ?)",
      [name, email, passwordHash, phone]
    );

    return res.status(201).json({
      message: "Sikeres regisztráció",
      user_id: result.insertId,
      email,
      name,
      phone,
    });
  } catch (err) {
    // UNIQUE email eset
    if (err?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Már létezik fiók ezzel az emaillel." });
    }

    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Szerver hiba történt." });
  }
});

/**
 * POST /api/users/login
 * body: { email, password }
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email és jelszó kötelező." });
    }

    const [rows] = await db.query(
      "SELECT user_id, email, password_hash, name, phone FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Hibás email vagy jelszó." });
    }

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);

    if (!ok) {
      return res.status(401).json({ message: "Hibás email vagy jelszó." });
    }

    return res.json({
      message: "Sikeres bejelentkezés",
      user_id: user.user_id,
      email: user.email,
      name: user.name,
      phone: user.phone,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Szerver hiba történt." });
  }
});

export default router;
