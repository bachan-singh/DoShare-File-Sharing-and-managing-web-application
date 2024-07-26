const FileService = require('../service/fileSerive');
const File = require('../models/Files');

const fs = require('fs');
const path = require('path');

//Upload File into Databse
exports.uploadFile = async (req, res) => {
  try {
    const fileData = {
      name: req.body.name,
      file: req.file.filename,
      file_type: req.file.mimetype,
      size: req.file.size,
      isPrivate: req.body.isPrivate,
      created_by: req.body.created_by
    };

    const result = await FileService.uploadFile(fileData);
    
    res.send(result);
  } catch (error) {
    console.error("Error saving file to MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch Files according to user
exports.getFilesByUser = async (req, res) => {
  try {  
    const userId = req.params.userId;
    const files = await FileService.getFilesByUser(userId);
    res.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).send("Internal Server Error");
  }
};


// Delete File from database
exports.deleteFile = async (req, res) => {
  try {
      const { id } = req.params;
      await File.findByIdAndDelete(id);
      res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to update file name by ID
exports.updateFileName = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.body;

  try {
    const updatedFile = await File.findByIdAndUpdate(id, { name: filename }, { new: true });

    if (!updatedFile) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.json(updatedFile);
  } catch (error) {
    console.error('Error updating filename:', error);
    res.status(500).json({ message: 'Failed to update filename', error });
  }
};
// Function to download a file
exports.downloadFile = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../Uploads/', filename); // Adjust the path as per your file storage

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Initiate file download
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Internal Server Error');
      }
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getTotalFilesCount = async (req, res) => {
  try {
    const count = await FileService.getTotalFilesCount();
    res.json({ totalFiles: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFileById = async (req, res) => {
  const fileId = req.params.fileId;
  try {
      const file = await FileService.getFileById(fileId);
      if (!file) {
          return res.status(404).json({ error: 'File not found' });
      }
      return res.json(file);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
}
