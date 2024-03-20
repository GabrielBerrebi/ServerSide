const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user.model');

// Contrôleur pour gérer le processus de connexion
exports.login = async (req, res) => {
  try {
    const { pseudo, password } = req.body;

    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ pseudo });

    // Vérification si l'utilisateur existe et si le mot de passe correspond
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Identifiant ou mot de passe incorrect' });
    }

    // Génération du jeton JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10h' });

    // Renvoi du jeton JWT en réponse
    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la connexion', error: error.message });
  }
};

// Contrôleur pour gérer la déconnexion
exports.logout = async (req, res) => {
    try {
      // Supprimer le cookie JWT
      res.cookie('jwt', '', { expires: new Date(0) });
  
      res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la déconnexion', error: error.message });
    }
  };
  
  