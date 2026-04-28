import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const geocodeDistrict = async (district) => {
    const { data } = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
            params: {
                address: `${district}, Laos`,
                key: GOOGLE_API_KEY,
            },
        }
    );

    if (data.status === "OK" && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
    }

    throw new Error("Location not found");
};
