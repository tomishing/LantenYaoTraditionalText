import axios from "axios";

// Axios setup 
// BASE_URL: /api/manuscripts, /api/geocode
// IMAGE_BASE_URL: image
const BASE_URL = `${import.meta.env.VITE_API_URL || ""}/api`;
const IMAGE_BASE_URL = import.meta.env.VITE_API_URL || "";

const client = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// Convert db path to full image URL
export const getImageUrl = (pathImg) => {
    if (!pathImg) return null;
    return `${IMAGE_BASE_URL}/images/${pathImg}`;
};

// Convert db path to full pdf URL (public)
export const getPdfUrl = (pathPdf) => {
    if (!pathPdf) return null;
    return `${IMAGE_BASE_URL}/api/pdfs/${encodeURIComponent(pathPdf)}`;
};
// Read-only operations on backend
const documentApi = {
    getAll: async ({
        page = 1, limit = 9, search = "", hasPdf = false,
        province = "", district = "", village = "", category = "",
    } = {}) => {
        const { data } = await client.get("/manuscripts", {
            params: {
                page, limit, search,
                hasPdf: hasPdf || undefined,
                province: province || undefined,
                district: district || undefined,
                village: village || undefined,
                category: category || undefined,
            },
        });
        return data;
    },

    // [{ province, district, village }, ...] distinct combinations
    getLocations: async () => {
        const { data } = await client.get("/manuscripts/locations");
        return data.locations;
    },

    // [{ category, count }, ...] distinct categories
    getCategories: async () => {
        const { data } = await client.get("/manuscripts/categories");
        return data.categories;
    },

    getById: async (id) => {
        const { data } = await client.get(`/manuscripts/${id}`);
        return data.data;
    },
};

export default documentApi;
