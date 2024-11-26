const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers')


router.post('/createUser', userController.createUser);
router.get('/getUsers', userController.getUsers);

module.exports = router;