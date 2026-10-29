
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./db.js";
import authRouter from "./Routes/Authroutes.js";
import userRouter from "./Routes/userroutes.js";
import notesrouter from "./Routes/generateroutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT||5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: `Server is running on port ${PORT}`
    });
});

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter)
app.use("/api/notes",notesrouter);
app.listen(PORT, () => {
    connect();
    console.log(`Server is running at http://localhost:${PORT}`);
});
