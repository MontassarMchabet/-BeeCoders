const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser'); // ou express.json()
require('dotenv').config(); // Pour charger les variables d'environnement depuis .env

const app = express();
const PORT = process.env.PORT ;

app.use(cors());
app.use(bodyParser.json()); // ou app.use(express.json())

// Connexion à MongoDB (en utilisant les variables d'environnement)
const MONGO_URI =  'mongodb://localhost:27017/beecoders'; // URI par défaut pour le développement local
const path = require('path');

// Servir les fichiers statiques dans le dossier 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur de connexion à MongoDB', err));


const CoursesRoute=require("./routes/courses")
app.use('/Course', CoursesRoute);


app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));