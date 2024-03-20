const User = require("./user.model");
const Lead = require("./lead.model")
const mongoose = require("mongoose")
const teleproSchema = new mongoose.Schema({
    nom: {
      type: String,
      required: true
    },
    prenom: {
      type: String,
      required: true
    },
    leads: [Lead.schema], // Tableau de leads affectés à ce téléprospecteur
    user: User.schema
    }
  );

const Telepro = mongoose.model('Telepro', teleproSchema);

// Exporter le modèle
module.exports = Telepro;