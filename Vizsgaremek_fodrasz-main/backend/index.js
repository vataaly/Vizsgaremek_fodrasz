import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import usersRoutes from "./routes/users.js";
import stylistsRoutes from "./routes/stylists.js";
import appointmentsRoutes from "./routes/appointments.js";

dotenv.config();

const app = express();


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

app.use(express.json());


app.use("/api/users", usersRoutes);
app.use("/api/stylists", stylistsRoutes);
app.use("/api/appointments", appointmentsRoutes);


app.get("/", (req, res) => {
  res.send("Backend fut 🚀");
});


app.use((req, res) => {
  res.status(404).json({ message: "Nincs ilyen végpont" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Szerver hiba" });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend fut: http://localhost:${PORT}`);
});