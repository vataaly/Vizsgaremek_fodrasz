 
 
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
 
    /* ===== VALIDÁLÁS ===== */

    if (

      !user_id ||

      !stylist_id ||

      !service_id ||

      !appointment_date ||

      !start_time ||

      !end_time

    ) {

      return res.status(400).json({

        message: "Minden mező kötelező",

      });

    }
 
    if (start_time >= end_time) {

      return res.status(400).json({

        message: "A kezdési időnek kisebbnek kell lennie a végidőnél",

      });

    }
 
    /* ===== ÜTKÖZÉS ELLENŐRZÉS ===== */

    const [conflicts] = await db.query(

      `

      SELECT id FROM appointments

      WHERE stylist_id = ?

        AND appointment_date = ?

        AND (

          (start_time < ? AND end_time > ?) OR

          (start_time < ? AND end_time > ?) OR

          (start_time >= ? AND end_time <= ?)

        )

      `,

      [

        stylist_id,

        appointment_date,

        end_time,

        start_time,

        end_time,

        start_time,

        start_time,

        end_time,

      ]

    );
 
    if (conflicts.length > 0) {

      return res.status(409).json({

        message: "Ez az időpont már foglalt ennél a fodrásznál",

      });

    }
 
    /* ===== INSERT ===== */

    await db.query(

      `

      INSERT INTO appointments

      (user_id, stylist_id, service_id, appointment_date, start_time, end_time)

      VALUES (?, ?, ?, ?, ?, ?)

      `,

      [

        user_id,

        stylist_id,

        service_id,

        appointment_date,

        start_time,

        end_time,

      ]

    );
 
    res.status(201).json({

      message: "Időpont sikeresen lefoglalva",

    });

  } catch (err) {

    console.error("Appointment error:", err);

    res.status(500).json({

      message: "Szerver hiba történt",

    });

  }

});
 
export default router;

 