import express from 'express'
import isAuth from '../Middlewares/isAuth.js';
import { pdfDownload } from '../Controllers/pdfController.js';
import { getMyNotes, getSingleNotes } from '../Controllers/getuserNotesController.js';
const pdfrouter=express.Router();
pdfrouter.post('/generate-pdf',isAuth,pdfDownload)
pdfrouter.get('/getnotes',isAuth,getMyNotes)
pdfrouter.get('/:id',isAuth,getSingleNotes)
export default pdfrouter
