const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const connectDB = require('./config/database');

dotenv.config();
connectDB();

const updates = [
    {
        search: /Web/i, // Cherche "Web" dans le titre
        key: 'WEB2026',
        targetTitle: 'Développement Web'
    },
    {
        search: /POO|Objet/i, // Cherche "POO" ou "Objet"
        key: 'POO2026',
        targetTitle: 'Programmation Orientée Objet (POO)'
    },
    {
        search: /Données|BD|Data/i, // Cherche "Données" ou "BD"
        key: 'BD2026',
        targetTitle: 'Bases de Données'
    }
];

const updateCourses = async () => {
    try {
        console.log('🔄 Mise à jour des clés de cours...');

        for (const update of updates) {
            // On cherche un cours qui correspond au motif
            let course = await Course.findOne({ title: update.search });

            if (course) {
                console.log(`✅ Trouvé : "${course.title}"`);
            } else {
                console.log(`⚠️ Non trouvé pour "${update.targetTitle}". Recherche...`);
                // Si pas trouvé, on essaye de le trouver via d'autres mots clés ou on passe
                continue;
            }

            // Mise à jour
            course.enrollmentKey = update.key;
            course.isPublic = false; // Important : Cours privé pour demander la clé
            course.targetAudience = 'Payant/Clé'; // Juste pour l'info

            await course.save();
            console.log(`🔑 Clé mise à jour pour "${course.title}" : ${update.key}`);
            console.log(`🔒 Cours verrouillé.`);
            console.log('---');
        }

        console.log('🎉 Mise à jour terminée !');
        process.exit();
    } catch (error) {
        console.error('Erreur:', error);
        process.exit(1);
    }
};

updateCourses();
