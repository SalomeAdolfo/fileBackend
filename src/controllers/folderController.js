import fs from 'fs'
const createFolder = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Folder name is required' });
    }

    try {
        fs.mkdirSync(`./src/uploads/${name}`);
        return res.json({ message: `Folder '${name}' created successfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const addFileToFolder = (req, res) => {
    const { folderName } = req.params;
    const { file } = req;
    if (!folderName) {
        return res.status(400).json({ message: 'Folder name is required' });
    }
    if (!file) {
        return res.status(400).json({ message: 'File is required' });
    }

    try {
        fs.writeFileSync(`./src/uploads/${folderName}/${file.originalname}`, file.buffer);
        return res.json({ message: `File '${file.originalname}' added to folder '${folderName}' successfully` });
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

export { createFolder, addFileToFolder, deleteFolder, deleteFile, getFoldersAndFiles };
