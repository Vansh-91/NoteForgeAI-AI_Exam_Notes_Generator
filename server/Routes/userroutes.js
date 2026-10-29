import express from "express";
import isAuth from "../Middlewares/isAuth.js";
import getcurrentuser from "../Controllers/userController.js";
const userRouter=express.Router();
userRouter.get("/currentuser",isAuth,getcurrentuser);
export default userRouter;