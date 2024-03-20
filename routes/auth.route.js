const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Route pour le processus de connexion
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
