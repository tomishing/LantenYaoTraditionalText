import express from "express";
import { getCoordinates } from "../controllers/geocodeController.js";

const router = express.Router();

// Whenever a GET request hits this route, execute the getCoordinates function
router.get("/", getCoordinates);

export default router;
