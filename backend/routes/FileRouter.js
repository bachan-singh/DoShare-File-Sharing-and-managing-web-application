
const express = require('express');
const multer = require('multer');
const fileController = require('../controller/FileController');

const path = require('path');
const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });


// Serve static files from the "Uploads" directory
router.use('/Uploads', express.static(path.join(__dirname, '../Uploads')));

//Route for Uploading File
router.post('/upload', upload.single('file'), fileController.uploadFile);

//Route for fetching files according to user
router.get('/files/:userId', fileController.getFilesByUser); 

router.delete('/delete/:id', fileController.deleteFile);

// Route to update file name by ID
router.put('/files/:id', fileController.updateFileName);

//Route to Download File by name
router.get('/download/:filename', fileController.downloadFile);

//Route for counting total files
router.get('/total-files', fileController.getTotalFilesCount);

//Route for Sharing file
router.get('/share/:fileId', fileController.getFileById);

//Router for displaying file
router.get('/display/:fileId', fileController.getFileById);


module.exports = router;
