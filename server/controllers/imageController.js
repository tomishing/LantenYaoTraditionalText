import { convertTiffToPng } from "../services/imageService.js";

export const getConvertedImage = async (req, res, next) => {
    const { dir, file } = req.params;
    const width = parseInt(req.query.width) || 800;

    try {
        const buffer = await convertTiffToPng(dir, file, width);

        res.set("Content-Type", "image/png");
        res.set("Cache-Control", "no-cache, no-store, must-revalidate");

        res.send(buffer);
    } catch (e) {
        next(e);
    }
};
