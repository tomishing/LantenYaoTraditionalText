import { geocodeDistrict } from "../services/geocodeService.js";

export const getCoordinates = async (req, res, next) => {
    try {
        const { district } = req.query;

        if (!district) {
            return res.status(400).json({ message: "District is required" });
        }

        const coords = await geocodeDistrict(district);
        res.json(coords);
    } catch (err) {
        next(err);
    }
};
