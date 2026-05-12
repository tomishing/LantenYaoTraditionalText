import express from "express";
import { servePdf } from "../controllers/pdfController.js";

const router = express.Router();

router.get("/:filename", servePdf);

export default router;
