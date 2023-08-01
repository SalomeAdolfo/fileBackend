import express from 'express';
import { createFolder, addFileToFolder, deleteFolder, deleteFile, getFoldersAndFiles, getFile, getFilesInFolder } from '../controllers/folderController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/create/:parentFolder?', createFolder); //Ruta para crear subfolders
// Endpoint to create a folder
router.post('/create', createFolder); //Ruta para crear folder único

// Endpoint to add a file to a folder
router.post('/addFile/:folderName', upload.single('file'), addFileToFolder);

// Endpoint to delete a folder
router.delete('/delete/:folderName', deleteFolder);

// Endpoint to delete a file from a folder
router.delete('/delete/:folderName/:fileName', deleteFile);

// Endpoint to get list of folders and files inside each folder
router.get('/list', getFoldersAndFiles);

router.get('/list/:ruta', getFile) //Busca y descarga el file de la ruta que desees

router.get('/fileList/:ruta', getFilesInFolder) //Lista los files y carpetas de cada ruta

export default router;
