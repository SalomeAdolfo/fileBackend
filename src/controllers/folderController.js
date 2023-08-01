import fs from 'fs'
import path from 'path';
const createFolder = (req, res) => {
    const { name } = req.body;
    const { parentFolder } = req.params; // Obtener el nombre del folder padre desde los parámetros de la URL

    if (!name) {
        return res.status(400).json({ message: 'Folder name is required' });
    }

    try {
        const path = parentFolder ? `./src/uploads/${parentFolder}/${name}` : `./src/uploads/${name}`;
        fs.mkdirSync(path, { recursive: true });
        return res.json({ message: `Folder '${name}' created successfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const addFileToFolder = (req, res) => {
    const { folderName } = req.params;
    var newfolderName = folderName.replace(/-/g, '/')
    const { file } = req;
    if (!folderName) {
        return res.status(400).json({ message: 'Folder name is required' });
    }
    if (!file) {
        return res.status(400).json({ message: 'File is required' });
    }

    try {
        fs.writeFileSync(`./src/uploads/${newfolderName}/${file.originalname}`, file.buffer);
        return res.json({ message: `File '${file.originalname}' added to folder '${newfolderName}' successfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const deleteFolder = (req, res) => {
    const { folderName } = req.params;
    if (!folderName) {
        return res.status(400).json({ message: 'Folder name is required' });
    }

    try {
        fs.rmdirSync(`./src/uploads/${folderName}`, { recursive: true });
        return res.json({ message: `Folder '${folderName}' deleted successfully` });
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

const getFoldersAndFiles = (req, res) => {
    try {
        const folders = fs.readdirSync('./src/uploads', { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        const filesByFolder = {};
        folders.forEach((folder) => {
            const files = fs.readdirSync(`./src/uploads/${folder}`);
            filesByFolder[folder] = files;
        });

        return res.json(filesByFolder);
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
export { createFolder, addFileToFolder, deleteFolder, deleteFile, getFoldersAndFiles, getFile, getFilesInFolder };
