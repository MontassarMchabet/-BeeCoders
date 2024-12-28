const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser'); 
require('dotenv').config(); 
const PORT = process.env.PORT ;

app.use(cors());
app.use(bodyParser.json()); 

const MONGO_URI =  'mongodb://localhost:27017/beecoders'; 
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur de connexion à MongoDB', err));


const CoursesRoute=require("./routes/courses")
app.use('/Course', CoursesRoute);


app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));