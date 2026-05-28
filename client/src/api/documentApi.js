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

client.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Convert db path to full image URL
export const getImageUrl = (pathImg) => {
    if (!pathImg) return null;
    return `${IMAGE_BASE_URL}/images/${pathImg}`;
};

// Convert db path to full pdf URL (includes token for authentication)
export const getPdfUrl = (pathPdf) => {
    if (!pathPdf) return null;
    const token = localStorage.getItem("token");
    if (!token) return null;
    return `${IMAGE_BASE_URL}/api/pdfs/${pathPdf}?token=${token}`;
};
// CRUD operation on backend
const documentApi = {
    login: async (credentials) => {
        const { data } = await client.post("/auth/login", credentials);
        return data;
    },

    getAll: async ({ page = 1, limit = 9, search = "", hasPdf = false } = {}) => {
        const { data } = await client.get("/manuscripts", {
            params: { page, limit, search, hasPdf: hasPdf || undefined },
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
