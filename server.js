// Importer le module Express
const express = require('express');
const connectDB = require('./configuration/db');
const dotenv = require("dotenv").config()
const adminRoutes = require('./routes/admin.route'); 
const leadRoutes = require('./routes/lead.route');
const teleproRoutes = require('./routes/telepro.route');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route')
connectDB()


// Créer une application Express
const app = express();
app.use(express.json());

app.use("/admin", adminRoutes)
app.use("/lead", leadRoutes)
app.use("/telepro", teleproRoutes)
app.use("/user", userRoutes)
app.use("/auth", authRoutes)
// Définir un point de terminaison pour une requête GET
app.get('/', (req, res) => {
  res.send('Bonjour, monde!');
});

// Définir le port sur lequel le serveur écoutera
const port = 8000;

// Démarrer le serveur et écouter le port spécifié
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
