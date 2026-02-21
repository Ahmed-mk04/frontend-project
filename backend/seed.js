require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Quiz = require('./models/Quiz');

console.log('🌱 Initialisation de la base de données EduLearn...\n');

const seedData = async () => {
    try {
        // Connexion à MongoDB
        console.log('📡 Connexion à MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connecté à MongoDB\n');

        // Supprimer toutes les données existantes
        console.log('🗑️  Suppression des données existantes...');
        await User.deleteMany({});
        await Course.deleteMany({});
        await Quiz.deleteMany({});
        console.log('✅ Données supprimées\n');

        // Créer un admin
        console.log('👨‍💼 Création de l\'administrateur...');
        const admin = await User.create({
            firstName: 'Admin',
            lastName: 'EduLearn',
            email: 'admin@edulearn.com',
            password: 'admin123',
            role: 'admin'
        });
        console.log('✅ Admin créé');

        // Créer des enseignants
        console.log('\n👨‍🏫 Création des enseignants...');
        const teacher1 = await User.create({
            firstName: 'Marie',
            lastName: 'Dupont',
            email: 'marie.dupont@edulearn.com',
            password: 'teacher123',
            role: 'teacher',
            domain: 'Programmation Web',
            grade: 'Professeur'
        });

        const teacher2 = await User.create({
            firstName: 'Jean',
            lastName: 'Martin',
            email: 'jean.martin@edulearn.com',
            password: 'teacher123',
            role: 'teacher',
            domain: 'Base de données',
            grade: 'Maître de conférences'
        });
        console.log('✅ 2 enseignants créés');

        // Créer des étudiants
        console.log('\n👨‍🎓 Création des étudiants...');
        const student1 = await User.create({
            firstName: 'Ahmed',
            lastName: 'Benali',
            email: 'ahmed.benali@student.com',
            password: 'student123',
            role: 'student',
            studentId: 'STU001',
            year: '2024'
        });

        const student2 = await User.create({
            firstName: 'Fatima',
            lastName: 'Zahra',
            email: 'fatima.zahra@student.com',
            password: 'student123',
            role: 'student',
            studentId: 'STU002',
            year: '2024'
        });
        console.log('✅ 2 étudiants créés');

        // Créer des cours
        console.log('\n📚 Création des cours...');
        const course1 = await Course.create({
            title: 'Introduction au JavaScript',
            description: 'Apprenez les bases du JavaScript moderne avec ES6+',
            teacher: teacher1._id,
            enrollmentKey: 'JS2024',
            targetAudience: 'Débutants',
            category: 'Programmation',
            level: 'Débutant',
            videos: [
                {
                    title: 'Introduction',
                    url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
                    duration: '15:30',
                    order: 1
                },
                {
                    title: 'Variables et types',
                    url: 'https://www.youtube.com/watch?v=edlFjlzxkSI',
                    duration: '20:45',
                    order: 2
                }
            ],
            documents: [
                {
                    title: 'Support de cours JavaScript',
                    url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide',
                    type: 'pdf',
                    size: '2.5 MB',
                    order: 1
                }
            ]
        });

        const course2 = await Course.create({
            title: 'MongoDB pour débutants',
            description: 'Maîtrisez MongoDB et les bases de données NoSQL',
            teacher: teacher2._id,
            enrollmentKey: 'MONGO2024',
            targetAudience: 'Intermédiaire',
            category: 'Base de données',
            level: 'Intermédiaire',
            videos: [
                {
                    title: 'Qu\'est-ce que MongoDB?',
                    url: 'https://www.youtube.com/watch?v=c2M-rlkkT5o',
                    duration: '18:20',
                    order: 1
                }
            ]
        });

        const course3 = await Course.create({
            title: 'Node.js et Express',
            description: 'Créez des API REST avec Node.js et Express',
            teacher: teacher1._id,
            enrollmentKey: 'NODE2024',
            targetAudience: 'Avancé',
            category: 'Backend',
            level: 'Avancé'
        });
        console.log('✅ 3 cours créés');

        // Créer un quiz
        console.log('\n📝 Création des quiz...');
        const quiz1 = await Quiz.create({
            course: course1._id,
            title: 'Quiz JavaScript - Variables',
            description: 'Testez vos connaissances sur les variables en JavaScript',
            questions: [
                {
                    question: 'Quelle est la différence entre let et var?',
                    options: [
                        'Aucune différence',
                        'let a une portée de bloc, var a une portée de fonction',
                        'var est plus moderne',
                        'let est obsolète'
                    ],
                    correctAnswer: 1,
                    points: 2
                },
                {
                    question: 'Comment déclarer une constante en JavaScript?',
                    options: [
                        'var x = 5',
                        'let x = 5',
                        'const x = 5',
                        'constant x = 5'
                    ],
                    correctAnswer: 2,
                    points: 2
                },
                {
                    question: 'Quel type de données n\'existe pas en JavaScript?',
                    options: [
                        'String',
                        'Number',
                        'Character',
                        'Boolean'
                    ],
                    correctAnswer: 2,
                    points: 1
                }
            ],
            duration: 15,
            passingScore: 60
        });
        console.log('✅ 1 quiz créé');

        console.log('\n' + '='.repeat(50));
        console.log('🎉 Base de données initialisée avec succès!');
        console.log('='.repeat(50));
        console.log('\n📋 COMPTES DE TEST:');
        console.log('━'.repeat(50));
        console.log('\n👨‍💼 ADMINISTRATEUR:');
        console.log('   Email: admin@edulearn.com');
        console.log('   Mot de passe: admin123');
        console.log('\n👨‍🏫 ENSEIGNANTS:');
        console.log('   1. Email: marie.dupont@edulearn.com');
        console.log('      Mot de passe: teacher123');
        console.log('      Domaine: Programmation Web');
        console.log('\n   2. Email: jean.martin@edulearn.com');
        console.log('      Mot de passe: teacher123');
        console.log('      Domaine: Base de données');
        console.log('\n👨‍🎓 ÉTUDIANTS:');
        console.log('   1. Email: ahmed.benali@student.com');
        console.log('      Mot de passe: student123');
        console.log('      ID: STU001');
        console.log('\n   2. Email: fatima.zahra@student.com');
        console.log('      Mot de passe: student123');
        console.log('      ID: STU002');
        console.log('\n📚 CLÉS D\'INSCRIPTION AUX COURS:');
        console.log('   • JavaScript: JS2024');
        console.log('   • MongoDB: MONGO2024');
        console.log('   • Node.js: NODE2024');
        console.log('\n' + '━'.repeat(50));
        console.log('\n✨ Vous pouvez maintenant démarrer le serveur avec: npm run dev\n');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('\n❌ ERREUR lors de l\'initialisation:');
        console.error(error.message);
        console.error('\n💡 Vérifiez que MongoDB est démarré et accessible.');
        await mongoose.connection.close();
        process.exit(1);
    }
};

// Exécuter le seed
seedData();
