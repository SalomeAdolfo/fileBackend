import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import folderRoutes from './routes/folderRoutes.js';

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Routes
app.use('/folders', folderRoutes);

export default app;
