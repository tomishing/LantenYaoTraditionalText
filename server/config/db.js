import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
    connectionString: process.env.PG_URI,
});

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("Connected to PostgreSQL");
        client.release();
    } catch (err) {
        console.log("Connection error: ", err.message);
    }
};

export const disconnectDB = async () => {
    await pool.end();
    console.log("PostgreSQL connection closed");
};
