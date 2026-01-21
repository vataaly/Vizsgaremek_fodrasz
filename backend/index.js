import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import usersRoutes from "./routes/users.js";
import stylistsRoutes from "./routes/stylists.js";
import appointmentsRoutes from "./routes/appointments.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/stylists", stylistsRoutes);
app.use("/api/appointments", appointmentsRoutes);

app.get("/", (req, res) => {
  res.send("Backend fut 🚀");
});

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
