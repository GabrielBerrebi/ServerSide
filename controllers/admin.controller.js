// admin.controller.js
const Admin = require('../models/admin.model');

// Créer un admin
exports.createAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de l\'admin', error: error.message });
  }
};

// Lire tous les admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des admins', error: error.message });
  }
};

// Lire un admin par son ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin non trouvé' });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'admin', error: error.message });
  }
};

// Mettre à jour un admin
exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admin) {
      return res.status(404).json({ message: 'Admin non trouvé' });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'admin', error: error.message });
  }
};

// Supprimer un admin
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin non trouvé' });
    }
    res.status(200).json({ message: 'Admin supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'admin', error: error.message });
  }
};

// Ajouter un téléprospecteur à un admin
exports.addTelepro = async (req, res) => {
    try {
      const adminId = req.params.id;
      const teleproData = req.body;
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ message: 'Admin non trouvé' });
      }
      admin.telepros.push(teleproData);
      await admin.save();
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'ajout du téléprospecteur à l\'admin', error: error.message });
    }
  };
  
  // Ajouter un lead à un admin
  exports.addLead = async (req, res) => {
    try {
      const adminId = req.params.id;
      const leadData = req.body;
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ message: 'Admin non trouvé' });
      }
      admin.leads.push(leadData);
      await admin.save();
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'ajout du lead à l\'admin', error: error.message });
    }
  };
  
  // Retirer un téléprospecteur d'un admin
exports.removeTelepro = async (req, res) => {
    try {
      const adminId = req.params.id;
      const teleproId = req.body.teleproId;
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ message: 'Admin non trouvé' });
      }
      admin.telepros = admin.telepros.filter(telepro => telepro._id.toString() !== teleproId);
      await admin.save();
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression du téléprospecteur de l\'admin', error: error.message });
    }
  };
  
  // Retirer un lead d'un admin
  exports.removeLead = async (req, res) => {
    try {
      const adminId = req.params.id;
      const leadId = req.body.leadId;
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ message: 'Admin non trouvé' });
      }
      admin.leads = admin.leads.filter(lead => lead._id.toString() !== leadId);
      await admin.save();
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression du lead de l\'admin', error: error.message });
    }
  };
  