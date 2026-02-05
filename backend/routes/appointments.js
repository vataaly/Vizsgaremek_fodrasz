import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    user_id,
    stylist_id,
    service_id,
    appointment_date,
    start_time,
    end_time,
  } = req.body;

  await db.query(
    `INSERT INTO appointments
     (user_id, stylist_id, service_id, appointment_date, start_time, end_time)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      user_id,
      stylist_id,
      service_id,
      appointment_date,
      start_time,
      end_time,
    ]
  );

  res.json({ message: "Időpont lefoglalva" });
});

export default router;
