const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/all-users', userController.getUsers);

// Define the login route
router.post('/login', userController.login);

router.post('/register', userController.register);

router.delete('/delete', userController.deleteAccountController);
router.delete('/delete-user/:id', userController.deleteUser);

router.post('/update-password', userController.updatePasswordController);

router.get('/total-users', userController.getTotalUsersCount);


module.exports = router;
