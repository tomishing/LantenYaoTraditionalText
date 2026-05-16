import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
    connectionString: process.env.PG_URI,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("Connected to PostgreSQL");
        client.release();
    } catch (err) {
        console.error("Connection error:", err);
    }
};

export const disconnectDB = async () => {
    await pool.end();
    console.log("PostgreSQL connection closed");
};
