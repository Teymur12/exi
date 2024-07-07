import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/auth.routes.js";
import postRouter from "./routes/posts.routes.js";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 9000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cookieParser());
app.use(express.static("./"));
app.use(express.json());
app.use("/api/auth" , router)
app.use("/api/post" ,postRouter)

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log(`Database connected and server is listening on ${PORT}`);
        app.listen(PORT);
    })
    .catch((error) => {
        console.error("Error connecting to database:", error.message);
    });
