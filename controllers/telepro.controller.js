const Telepro = require('../models/telepro.model');

// Contrôleur pour créer un nouveau téléprospecteur
exports.createTelepro = async (req, res) => {
  try {
    const { nom, prenom, leads, user } = req.body;
    const telepro = new Telepro({ nom, prenom, leads, user });
    await telepro.save();
    res.status(201).json({ message: 'Téléprospecteur créé avec succès', telepro });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du téléprospecteur', error: error.message });
  }
};

// Contrôleur pour récupérer tous les téléprospecteurs
exports.getAllTelepros = async (req, res) => {
  try {
    const telepros = await Telepro.find();
    res.status(200).json(telepros);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des téléprospecteurs', error: error.message });
  }
};

// Contrôleur pour récupérer un téléprospecteur par son ID
exports.getTeleproById = async (req, res) => {
  try {
    const telepro = await Telepro.findById(req.params.id);
    if (!telepro) {
      return res.status(404).json({ message: 'Téléprospecteur non trouvé' });
    }
    res.status(200).json(telepro);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du téléprospecteur', error: error.message });
  }
};

// Contrôleur pour mettre à jour un téléprospecteur
exports.updateTelepro = async (req, res) => {
  try {
    const { nom, prenom, leads, user } = req.body;
    const telepro = await Telepro.findByIdAndUpdate(req.params.id, { nom, prenom, leads, user }, { new: true });
    if (!telepro) {
      return res.status(404).json({ message: 'Téléprospecteur non trouvé' });
    }
    res.status(200).json({ message: 'Téléprospecteur mis à jour avec succès', telepro });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du téléprospecteur', error: error.message });
  }
};

// Contrôleur pour supprimer un téléprospecteur
exports.deleteTelepro = async (req, res) => {
  try {
    const telepro = await Telepro.findByIdAndDelete(req.params.id);
    if (!telepro) {
      return res.status(404).json({ message: 'Téléprospecteur non trouvé' });
    }
    res.status(200).json({ message: 'Téléprospecteur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du téléprospecteur', error: error.message });
  }
};

// Fonction pour ajouter un lead à un téléprospecteur
exports.addLeadToTelepro = async (req, res) => {
  try {
    const { leadId } = req.body;
    const teleproId = req.params.id;
    const telepro = await Telepro.findByIdAndUpdate(teleproId, { $push: { leads: leadId } }, { new: true });
    if (!telepro) {
      return res.status(404).json({ message: 'Téléprospecteur non trouvé' });
    }
    res.status(200).json({ message: 'Lead ajouté au téléprospecteur avec succès', telepro });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout du lead au téléprospecteur', error: error.message });
  }
};

// Fonction pour supprimer un lead d'un téléprospecteur
exports.deleteLeadFromTelepro = async (req, res) => {
  try {
    const leadId = req.params.leadId;
    const teleproId = req.params.id;
    const telepro = await Telepro.findByIdAndUpdate(teleproId, { $pull: { leads: leadId } }, { new: true });
    if (!telepro) {
      return res.status(404).json({ message: 'Téléprospecteur non trouvé' });
    }
    res.status(200).json({ message: 'Lead supprimé du téléprospecteur avec succès', telepro });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du lead du téléprospecteur', error: error.message });
  }
};
