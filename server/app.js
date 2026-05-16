import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import router from "./routes/routes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import geocodeRouter from "./routes/geocodeRoute.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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

// Images and PDFs via R2 (proxied through API)
import imageRouter from "./routes/imageRoute.js";
import pdfRouter from "./routes/pdfRoute.js";
app.use("/images", imageRouter);
app.use("/api/pdfs", pdfRouter);

// Serve built React client in production
const clientDist = path.join(__dirname, "../client/dist");
app.use(express.static(clientDist));
app.get("/{*splat}", (req, res, next) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/images/")) return next();
  res.sendFile(path.join(clientDist, "index.html"));
});

// Error
app.use(errorHandler);

export default app;
