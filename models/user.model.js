const mongoose = require('mongoose');

// Définir les valeurs possibles pour le champ 'type'
const typeEnum = ['Admin', 'Telepro', 'Createur'];

// Schéma utilisateur
const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: false,
    unique: true // Assure que chaque pseudo est unique dans la base de données
  },
  password: {
    type: String,
    required: false
  },
  type: {
    type: String,
    enum: typeEnum, // Utilisation de l'enum pour le champ 'type'
    default: "Admin"
  }
});

// Modèle utilisateur
const User = mongoose.model('User', userSchema);

// Exporter le modèle
module.exports = User;

