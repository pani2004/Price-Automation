import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./db/index.js";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser())
connectDb().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server running on port ${process.env.PORT}`); 
    })
})
.catch((err)=>{
    console.log("Server failed to start");
    process.exit(1);
})

app.use('/api',authRoutes)
app.use('/api',searchRoutes)
app.use('/api',serviceRoutes)
app.use('/api',vehicleRoutes)
app.use('/api',analyticsRoutes)
