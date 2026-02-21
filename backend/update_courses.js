const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const User = require('./models/User');
const connectDB = require('./config/database');

dotenv.config();

const run = async () => {
    await connectDB();

    console.log('🔄 Préparation des cours...');

    // 1. Trouver un enseignant
    let teacher = await User.findOne({ role: 'teacher' });
    if (!teacher) {
        // Créer un prof par défaut si besoin
        console.log('⚠️ Aucun enseignant trouvé, création d\'un prof par défaut...');
        teacher = await User.create({
            firstName: 'Prof', lastName: 'Default',
            email: 'prof@test.com', password: 'password123',
            role: 'teacher'
        });
    }

    const coursesToUpdate = [
        {
            title: 'Développement Web Moderne',
            desc: 'Apprenez HTML, CSS, JS et plus.',
            key: 'WEB2026'
        },
        {
            title: 'Programmation Orientée Objet (POO)',
            desc: 'Les concepts fondamentaux de la POO.',
            key: 'POO2026'
        },
        {
            title: 'Conception de Bases de Données',
            desc: 'Modélisation, SQL et NoSQL.',
            key: 'BD2026'
        }
    ];

    for (const c of coursesToUpdate) {
        // Recherche large (regex) ou par titre exact
        let course = await Course.findOne({
            title: { $regex: new RegExp(c.title.split(' ')[0], 'i') } // Cherche "Développement", "Programmation", "Conception"
        });

        if (course) {
            console.log(`✅ Mise à jour de : "${course.title}"`);
            course.title = c.title; // Mise à jour du titre complet
            course.enrollmentKey = c.key;
            course.isPublic = false; // Verrouiller
            course.targetAudience = 'Payant/Clé';
        } else {
            console.log(`🆕 Création de : "${c.title}"`);
            course = new Course({
                title: c.title,
                description: c.desc,
                teacher: teacher._id,
                enrollmentKey: c.key,
                isPublic: false, // Verrouiller
                targetAudience: 'Payant/Clé',
                category: 'Informatique',
                level: 'Débutant'
            });
        }

        await course.save();
        console.log(`   🔑 Clé définie : ${c.key}`);
        console.log(`   🔒 Statut : Privé (Mot de passe requis)`);
    }

    console.log('✅ Tous les cours sont à jour !');
    process.exit();
};

run().catch(err => console.error(err));
