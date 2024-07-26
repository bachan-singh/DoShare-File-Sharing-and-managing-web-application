const File = require('../models/Files');

//Uploading Files into database
exports.uploadFile = async (fileData) => {
  try {
    const result = await File.create(fileData);
    return result;
  } catch (error) {
    throw error;
  }
};
// Fetch All Files
exports.getFilesByUser = async (userId) => {
  try {
    const files = await File.find({ created_by: userId });
    return files;
  } catch (error) {
    throw error;
  }
};

// Download File
exports.getFileById = async (id) => {
  try {
    const file = await File.findById(id);
    return file;
  } catch (error) {
    throw new Error('Error retrieving file from database');
  }
}


exports.fetchFileById = async (id) => {
  try {
      const file = await File.findById(id);
      return file;
  } catch (error) {
      console.error('Error fetching file:', error);
      throw new Error('Failed to fetch file');
  }
};


exports.getTotalFilesCount = async () => {
  try {
    const count = await File.countDocuments();
    return count;
  } catch (error) {
    throw new Error('Error fetching total files count');
  }
};

