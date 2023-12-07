import express from 'express';
import { addFileToFolder, deleteFile, getFolders, getFile, getFilesInFolder,getSingleData, getPersonajes } from '../controllers/folderController.js';
import multer from 'multer';
import { pool } from '../db.js'


import * as middleAuth from '../middlewares/authJWT.js'

const router = express.Router();
const upload = multer();

// Endpoint to add a file to a folder
router.post('/addFile/:folderName', upload.single('file'), addFileToFolder);

// Endpoint to delete a file from a folder
router.delete('/delete/:folderName/:fileName', deleteFile);

// Endpoint to get list of folders and files inside each folder
router.get('/list', getFolders);

router.get('/list/:ruta', getFile) //Busca y descarga el file de la ruta que desees

router.get('/fileList/:ruta', getFilesInFolder) //Lista los files y carpetas de cada ruta

router.get('/personaje', getPersonajes)

router.get('/personaje/:IdPersonaje', getSingleData)

export default router;
