import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./presentation/routes/apiRoutes";
import { errorHandler } from "./presentation/middlewares/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API Financiero - Backend Activo 🚀");
});

app.use("/api", apiRoutes);

// Registrar el Manejador Global de Errores al final de las rutas
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor Financiero escuchando en http://localhost:${PORT}`);
});