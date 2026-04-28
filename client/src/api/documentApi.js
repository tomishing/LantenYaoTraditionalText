import axios from "axios";

// Axios setup 
// BASE_URL: /api/manuscripts, /api/geocode
// IMAGE_BASE_URL: image
const BASE_URL = "http://localhost:3000/api";
const IMAGE_BASE_URL = "http://localhost:3000";

const client = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// Convert db path to full image URL with width
export const getImageUrl = (filePath, width = 800) => {
    if (!filePath) return null;
    const cleanPath = filePath.replace(/^(\.\/|\/)/, "");
    const webPath = cleanPath.replace(/\.(tiff|tif)$/i, ".png");
    return `${IMAGE_BASE_URL}/${webPath}?width=${width}`;
};
// CRUD operation on backend
const documentApi = {
    getAll: async ({ page = 1, limit = 9, search = "" } = {}) => {
        const { data } = await client.get("/manuscripts", {
            params: { page, limit, search },
        });
        return data;
    },

    getById: async (id) => {
        const { data } = await client.get(`/manuscripts/${id}`);
        return data.data;
    },
    // payload: form data
    create: async (payload) => {
        const { data } = await client.post("/manuscripts", payload);
        return data.data;
    },

    update: async (id, payload) => {
        const { data } = await client.put(`/manuscripts/${id}`, payload);
        return data.data;
    },

    remove: async (id) => {
        const { data } = await client.delete(`/manuscripts/${id}`);
        return data;
    },
};

export default documentApi;
