const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers')
const annonceController = require('../controllers/annonceController')


router.post('/createUser', userController.createUser);
router.get('/getUsers', userController.getUsers);
router.post('/createAnnonce/:id_utilisateur', annonceController.createAnnonces);

module.exports = router;