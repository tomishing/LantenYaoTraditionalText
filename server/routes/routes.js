import express from "express";
import {
    getAllManu,
    getLocations,
    getManuById,
} from "../controllers/Controller.js";

const router = express.Router();

// Read-only API: documents can be listed and viewed, never modified
router.get("/", getAllManu);
// Distinct locations for search suggestions (must be before "/:id")
router.get("/locations", getLocations);
router.get("/:id", getManuById);

export default router;
