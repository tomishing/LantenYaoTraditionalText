import express from "express";
import { getConvertedImage } from "../controllers/imageController.js";

const router = express.Router();

// Whenever access the path, execute the function.
router.get("/data/import/images/:dir/:file", getConvertedImage);

export default router;
