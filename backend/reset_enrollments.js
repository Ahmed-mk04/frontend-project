const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const User = require('./models/User');
const connectDB = require('./config/database');

dotenv.config();

const reset = async () => {
    await connectDB();
    console.log('🔄 Réinitialisation des inscriptions pour les cours Web/POO/BD...');

    const keys = ['WEB2026', 'POO2026', 'BD2026'];

    // Trouver les cours
    const courses = await Course.find({ enrollmentKey: { $in: keys } });

    for (const course of courses) {
        console.log(`🧹 Nettoyage du cours : "${course.title}"`);

        // 1. Vider la liste des étudiants inscrits dans le cours
        course.enrolledStudents = [];
        await course.save();

        // 2. Retirer ce cours des profils étudiants
        const result = await User.updateMany(
            { enrolledCourses: course._id },
            { $pull: { enrolledCourses: course._id } }
        );

        console.log(`   - ${result.modifiedCount} étudiants désinscrits.`);
    }

    console.log('✅ Inscriptions réinitialisées ! Vous pouvez tester les clés maintenant.');
    process.exit();
};

reset().catch(console.error);
