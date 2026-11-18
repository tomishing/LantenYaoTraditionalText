import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
    createManu,
    getAllManu,
    getLocations,
    getManuById,
    updateManu,
    deleteManu,
} from "../controllers/Controller.js";

const router = express.Router();

// Show all data and create data at root
router.route("/").get(getAllManu).post(authenticate, createManu);
// Distinct locations for search suggestions (must be before "/:id")
router.get("/locations", getLocations);
// Search, update and delete by ID passed by rq.param.id
router.route("/:id").get(getManuById).put(authenticate, updateManu).delete(authenticate, deleteManu);

export default router;
