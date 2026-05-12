import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./config/db.js";
import router from "./routes/routes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import geocodeRouter from "./routes/geocodeRoute.js";
const app = express();

// Database connection
await connectDB();

// CORS - configurable for different environments (must come before helmet)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173").split(",").map(o => o.trim());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// for reading req.body from frontend, req.body
app.use(express.json({ limit: "10kb" }));

// mount root
app.use("/api/auth", authRoutes);
app.use("/api/manuscripts", router);
app.use("/api/geocode", geocodeRouter);

// Public images
app.use("/images", express.static("images"));

// Protected PDFs via /api/pdfs/:filename?token=<jwt>
import pdfRouter from "./routes/pdfRoute.js";
app.use("/api/pdfs", pdfRouter);

// Error
app.use(errorHandler);

export default app;
