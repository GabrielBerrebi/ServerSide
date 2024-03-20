const Lead = require('../models/lead.model');

// Contrôleur pour créer un nouveau lead
exports.createLead = async (req, res) => {
  try {
    const { nom, prenom, numeroTel, status } = req.body;
    const lead = new Lead({ nom, prenom, numeroTel, status });
    await lead.save();
    res.status(201).json({ message: 'Lead créé avec succès', lead });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du lead', error: error.message });
  }
};

// Contrôleur pour récupérer tous les leads
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des leads', error: error.message });
  }
};

// Contrôleur pour récupérer un lead par son ID
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead non trouvé' });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du lead', error: error.message });
  }
};

// Contrôleur pour mettre à jour un lead
exports.updateLead = async (req, res) => {
  try {
    const { nom, prenom, numeroTel, status } = req.body;
    const lead = await Lead.findByIdAndUpdate(req.params.id, { nom, prenom, numeroTel, status }, { new: true });
    if (!lead) {
      return res.status(404).json({ message: 'Lead non trouvé' });
    }
    res.status(200).json({ message: 'Lead mis à jour avec succès', lead });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du lead', error: error.message });
  }
};

// Contrôleur pour supprimer un lead
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead non trouvé' });
    }
    res.status(200).json({ message: 'Lead supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du lead', error: error.message });
  }
};

// Contrôleur pour supprimer un lead d'un admin
exports.deleteLeadFromAdmin = async (req, res) => {
    try {
      const adminId = req.params.adminId;
      const leadId = req.params.leadId;
  
      // Supprimer le lead du tableau de leads dans l'admin correspondant
      const admin = await Admin.findByIdAndUpdate(adminId, { $pull: { leads: leadId } }, { new: true });
  
      if (!admin) {
        return res.status(404).json({ message: 'Admin non trouvé' });
      }
  
      res.status(200).json({ message: 'Lead supprimé de l\'admin avec succès', admin });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du lead de l\'admin', error: error.message });
    }
  };