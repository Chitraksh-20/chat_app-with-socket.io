import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connect from "./db/connect.js";
import authRoutes from "./routes/auth.routes.js";  // Ensure this is correctly imported
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { app, server } from './socket/socket.js';  // Ensure this is correctly imported

dotenv.config(); // Load environment variables

const port = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cookieParser());

// Route registration
app.use("/api/auth", authRoutes);  // Ensure this is correctly set up
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
    res.send("hello world");
});

// Corrected app.listen with proper callback syntax
server.listen(port, () => {
    connect();  // Call the connect function when the server starts
    console.log(`Server Running on port ${port}`); // Corrected template literal syntax
});
