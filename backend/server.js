import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connect from "./db/connect.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("hello worldll");
});
app.use(express.json()); 
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);
// Corrected app.listen with proper callback syntax
app.listen(port, () => {
    connect();  // Call the connect function when the server starts
    console.log(`Server Running on port ${port}`);
});
