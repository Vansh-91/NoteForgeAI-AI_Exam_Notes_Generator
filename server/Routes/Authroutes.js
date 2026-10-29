import express from "express";
import { GoogleAuth } from "../Controllers/AuthController.js";
const authRouter=express.Router();
authRouter.post("/google",GoogleAuth);
export default authRouter;