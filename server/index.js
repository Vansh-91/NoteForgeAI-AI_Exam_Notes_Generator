import 'dotenv/config';

console.log("Stripe key:", process.env.STRIPE_SECRET_KEY ? "Loaded" : "Missing");

import express from 'express';

import cors from "cors";
import dotenv from "dotenv";
import connect from "./db.js";
import authRouter from "./Routes/Authroutes.js";
import userRouter from "./Routes/userroutes.js";
import notesrouter from "./Routes/generateroutes.js";
import pdfrouter from "./Routes/pdfroutes.js";
import { stripeWebhook } from "./Controllers/creditsController.js";
import creditsrouter from './Routes/creditsRoutes.js';

const app = express();
const PORT = process.env.PORT||5000;

app.use(cors());
app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: `Server is running on port ${PORT}`
    });
});

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter)
app.use("/api/notes",notesrouter);
app.use('/api/pdf',pdfrouter)
app.use('/api/stripe',creditsrouter)
app.listen(PORT, () => {
    connect();
    console.log(`Server is running at http://localhost:${PORT}`);
});
