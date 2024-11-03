import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./db/index.js";
import cookieParser from "cookie-parser"
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
