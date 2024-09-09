import express from "express";
import { signup, login, logout } from "../controllers/authcontrollers.js";

const router = express.Router();

router.post("/signup", signup);  // POST route for signup
router.post("/login", login);    // POST route for login
router.post("/logout", logout);  // POST route for logout

export default router;
