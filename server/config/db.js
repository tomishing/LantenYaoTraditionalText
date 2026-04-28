import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected MongoDB");
        console.log(`Database: ${conn.connection.name}`); 
        console.log(`URI: ${process.env.MONGODB_URI}`);
    } catch (err) {
        console.log("Connection error: ", err.message);
    }
};

export const disconnectDB = async () => {
    await mongoose.connection.close();
    console.log("Connection closed");
};
