import express from 'express';
import { createFolder, addFileToFolder, deleteFolder, deleteFile, getFoldersAndFiles } from '../controllers/folderController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/create/:parentFolder?', createFolder);
// Endpoint to create a folder
router.post('/create', createFolder);

// Endpoint to add a file to a folder
router.post('/addFile/:folderName', upload.single('file'), addFileToFolder);

// Endpoint to delete a folder
router.delete('/delete/:folderName', deleteFolder);

// Endpoint to delete a file from a folder
router.delete('/delete/:folderName/:fileName', deleteFile);

// Endpoint to get list of folders and files inside each folder
router.get('/list', getFoldersAndFiles);

export default router;
