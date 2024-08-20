import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {sendMessage,getMessages} from "../controllers/message.controller.js"
const router=express.Router();
// Authorise through protectRoute
router.get('/:id',protectRoute,getMessages);
router.post('/send/:id',protectRoute,sendMessage);
export default router;
