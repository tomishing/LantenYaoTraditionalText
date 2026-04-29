import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import router from "./routes/routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import geocodeRouter from "./routes/geocodeRoute.js";
const app = express();

// Database connection
await connectDB();

// communicate with frontend.
app.use(cors({ origin: "http://localhost:5173" }));

// for reading req.body from frontend, req.body
app.use(express.json());

// mount root
app.use("/api/manuscripts", router);
app.use("/images", express.static("images"));
app.use("/pdfs", express.static("pdfs"));
app.use("/api/geocode", geocodeRouter);

// Error
app.use(errorHandler);

export default app;
