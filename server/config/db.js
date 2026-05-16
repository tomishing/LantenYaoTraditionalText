import pg from "pg";
const { Pool } = pg;

const connectionString = process.env.PG_URI || process.env.DATABASE_URL;
const isLocal = (connectionString || "").includes("localhost");
export const pool = new Pool({
    connectionString,
    ssl: isLocal ? false : { rejectUnauthorized: false },
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
