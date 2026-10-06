import axios from "axios";

// Nominatim usage policy: identify the app via User-Agent, max 1 request/second,
// and cache results. https://operations.osmfoundation.org/policies/nominatim/
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = process.env.NOMINATIM_USER_AGENT || "lanten-manuscripts-app";

const cache = new Map();
let lastRequest = Promise.resolve();

// Serialize requests so they are spaced at least 1 second apart
const throttle = () => {
    const next = lastRequest.then(
        () => new Promise((resolve) => setTimeout(resolve, 1000))
    );
    const current = lastRequest;
    lastRequest = next;
    return current;
};

export const geocodeDistrict = async (district) => {
    const key = district.trim().toLowerCase();
    if (cache.has(key)) return cache.get(key);

    await throttle();

    const { data } = await axios.get(NOMINATIM_URL, {
        params: {
            q: `${district}, Laos`,
            format: "json",
            limit: 1,
        },
        headers: { "User-Agent": USER_AGENT },
    });

    if (Array.isArray(data) && data.length > 0) {
        const coords = {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
        };
        cache.set(key, coords);
        return coords;
    }

    throw new Error("Location not found");
};
