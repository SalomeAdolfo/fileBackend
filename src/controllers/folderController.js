import fs from 'fs'
import path from 'path';
import { pool } from '../db.js';

const addFileToFolder = async (req, res) => {
    const { folderName } = req.params;

    var newfolderName = folderName.replace(/-/g, '/')

    const { file } = req;

    const { nombre, sector, especie, genero, puede_volar, caracteristicas } = req.body

    if (!folderName) {
        return res.status(400).json({ message: 'Folder name is required' });
    }
    if (!file) {
        return res.status(400).json({ message: 'File is required' });
    }

    try {
        fs.writeFileSync(`./src/uploads/${newfolderName}/${file.originalname}`, file.buffer);
        const query = `insert into personajes (nombre, sector, especie, genero, puede_volar, caracteristicas, imagen) values (?,?,?,?,?,?,?)`
        const values = [nombre, sector, especie, genero, JSON.parse(puede_volar), caracteristicas, `${newfolderName}-${file.originalname}`]
        const [result] = await pool.query(query, values)

        console.log(result)

        return res.json({ message: `File '${file.originalname}' added to folder '${newfolderName}' successfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const deleteFile = (req, res) => {
    const { folderName, fileName } = req.params;
    if (!folderName || !fileName) {
        return res.status(400).json({ message: 'Folder name and file name are required' });
    }

    try {
        fs.unlinkSync(`./src/uploads/${folderName}/${fileName}`);
        return res.json({ message: `File '${fileName}' deleted successfully from folder '${folderName}'` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};
const getFolders = (req, res) => {
    try {
        const folders = fs.readdirSync('./src/uploads', { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        return res.json(folders);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};


const getSingleFile = (folderPath, fileName, res) => {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);
        console.log(stats)
        if (stats.isDirectory()) {
            getSingleFile(filePath, fileName, res);
        } else if (file === fileName) {
            return res.download(filePath);
        }
    }
    return res.status(404).json({ message: 'File not found' });
};

const getFile = (req, res) => {
    try {
        const { ruta } = req.params;
        var newRuta = ruta.replace(/-/g, '/')
        const fileName = newRuta.split('/').pop();
        const folderPath = path.join('./src/uploads', newRuta.slice(0, -fileName.length));
        console.log(`Hola: ${folderPath}`, `fileName: ${fileName}`)
        getSingleFile(folderPath, fileName, res);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const getFilesInFolder = (req, res) => {
    try {
        const { ruta } = req.params;
        var newRuta = ruta.replace(/-/g, '/')
        const folderPath = path.join('./src/uploads', newRuta);
        const files = fs.readdirSync(folderPath);
        return res.json({ files });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};


const getPersonajes = async (req, res) => {
    try {
        const [rows] = await pool.query('Select * from personajes')
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ message: "Error" })
    }
}
const getSingleData = async (req, res) => {
    try {
        const [rows] = await pool.query('Select * from personajes where id = ?', req.params.IdPersonaje)
        return res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error" })
    }
}
export { addFileToFolder, deleteFile, getFolders, getFile, getFilesInFolder, getSingleData, getPersonajes };