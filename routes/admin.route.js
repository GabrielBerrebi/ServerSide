const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Créer un admin
router.post('/admins', adminController.createAdmin);

// Lire tous les admins
router.get('/admins', adminController.getAllAdmins);

// Lire un admin par son ID
router.get('/admins/:id', adminController.getAdminById);

// Mettre à jour un admin
router.put('/admins/:id', adminController.updateAdmin);

// Ajouter un téléprospecteur à un admin
router.post('/admins/:id/telepros', adminController.addTelepro);

// Ajouter un lead à un admin
router.post('/admins/:id/leads', adminController.addLead);

// Supprimer un admin
router.delete('/admins/:id', adminController.deleteAdmin);

// Retirer un téléprospecteur d'un admin
router.patch('/admins/:id/remove-telepro', adminController.removeTelepro);

// Retirer un lead d'un admin
router.patch('/admins/:id/remove-lead', adminController.removeLead);

module.exports = router;
