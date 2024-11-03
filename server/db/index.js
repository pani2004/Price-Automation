import mongoose from "mongoose";

export const connectDb= async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed");
        process.exit(1);
    }
}