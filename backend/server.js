import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connect from "./db/connect.js";
import authRoutes from "./routes/auth.routes.js";  
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { app, server } from './socket/socket.js';  // Ensure this is correctly imported
import path from 'path';
dotenv.config();

const port = process.env.PORT || 5000;
const __dirname = path.resolve();  // Corrected __dirname definition

app.use(express.json()); 
app.use(cookieParser());

// Route registration
app.use("/api/auth", authRoutes);  // Ensure this is correctly set up
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Corrected app.listen with proper callback syntax
server.listen(port, () => {
    connect();  // Call the connect function when the server starts
    console.log(`Server Running on port ${port}`); // Corrected template literal syntax
});
