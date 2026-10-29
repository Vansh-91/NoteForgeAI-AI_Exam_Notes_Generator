import express from "express"
import isAuth from "../Middlewares/isAuth.js";
import { generateNotes } from "../Controllers/generateController.js";
const notesrouter=express.Router();
notesrouter.post('/generate',isAuth,generateNotes);
export default notesrouter