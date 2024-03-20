const express = require('express');
const router = express.Router();
const teleproController = require('../controllers/telepro.controller');

// Routes pour les téléprospecteurs
router.post('/telepros', teleproController.createTelepro);
router.get('/telepros', teleproController.getAllTelepros);
router.get('/telepros/:id', teleproController.getTeleproById);
router.put('/telepros/:id', teleproController.updateTelepro);
router.delete('/telepros/:id', teleproController.deleteTelepro);

// Route pour ajouter un lead à un téléprospecteur
router.post('/telepros/:id/leads', teleproController.addLeadToTelepro);

// Route pour supprimer un lead d'un téléprospecteur
router.delete('/telepros/:id/leads/:leadId', teleproController.deleteLeadFromTelepro);

module.exports = router;
