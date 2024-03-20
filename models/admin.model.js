const Lead = require("./lead.model");
const Telepro = require("./telepro.model");
const User = require("./user.model");
const mongoose = require("mongoose")
const adminSchema = new mongoose.Schema({
    user: User.schema,
    leads: [Lead.schema], // Tableau de leads gérés par cet admin
    telepros: [Telepro.schema], // Tableau de téléprospecteurs
    chiffreAffaire: {
      type: Number,
      default: 0 // Chiffre d'affaires initialisé à 0
    }
  });

  const Admin = mongoose.model('Admin', adminSchema);

  module.exports = Admin;