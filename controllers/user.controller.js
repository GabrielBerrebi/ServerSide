const User = require('../models/user.model');

// Contrôleur pour créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const { pseudo, password, type } = req.body;
    const user = new User({ pseudo, password, type });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès', user });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur', error: error.message });
  }
};

// Contrôleur pour récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs', error: error.message });
  }
};

// Contrôleur pour récupérer un utilisateur par son ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'utilisateur', error: error.message });
  }
};

// Contrôleur pour mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { pseudo, password, type } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { pseudo, password, type }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur', error: error.message });
  }
};

// Contrôleur pour supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'utilisateur', error: error.message });
  }
};

