
const express = require('express');
const router = express.Router();

const mailController = require('../controller/mailController');

router.post('/mail/:id', mailController.sendMail);

module.exports = router;