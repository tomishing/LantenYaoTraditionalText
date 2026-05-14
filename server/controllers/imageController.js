import path from "path";
import { getImageUrl } from "../services/r2Service.js";

export const serveImage = async (req, res) => {
    try {
        const filename = path.basename(req.params.filename);
        const imageUrl = getImageUrl(filename);

        if (!imageUrl) {
            return res.status(400).json({ success: false, message: "Invalid filename" });
        }

        const imageResponse = await fetch(imageUrl);

        if (!imageResponse.ok) {
            return res.status(404).json({ success: false, message: "Image not found" });
        }

        const contentType = imageResponse.headers.get("content-type") || "image/png";
        res.setHeader("Content-Type", contentType);
        res.setHeader("Cache-Control", "public, max-age=31536000");

        const buffer = await imageResponse.arrayBuffer();
        res.send(Buffer.from(buffer));
    } catch (err) {
        console.error("Image fetch error:", err);
        res.status(500).json({ success: false, message: "Failed to fetch image" });
    }
};
