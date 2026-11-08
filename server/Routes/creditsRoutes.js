import express from "express";

import isAuth from "../Middlewares/isAuth.js";

import {
    createCreditsOrder
} from "../Controllers/creditsController.js";

const creditsrouter = express.Router();

creditsrouter.post("/create-order", isAuth, createCreditsOrder);

export default creditsrouter;