require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const { errorHandler, notFound } = require('./middleware/error');

// Connexion à la base de données
connectDB();

const app = express();

// Middlewares
app.use(cors({
    origin: true, // Accepter toutes les origines (pour le développement)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/forums', require('./routes/forums'));
app.use('/api/quizzes', require('./routes/quizzes'));

// Route de test
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API EduLearn - Backend fonctionnel ✅',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            courses: '/api/courses',
            forums: '/api/forums',
            quizzes: '/api/quizzes'
        }
    });
});

// Gestion des erreurs
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📡 API disponible sur http://localhost:${PORT}`);
    console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
});
