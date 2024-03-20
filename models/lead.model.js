const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  numeroTel: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
