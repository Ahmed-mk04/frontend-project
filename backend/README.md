# 🎓 EduLearn Backend

Backend complet pour la plateforme e-learning EduLearn, développé avec Node.js, Express et MongoDB.

## 📋 Fonctionnalités

### Authentification & Autorisation
- ✅ Inscription/Connexion avec JWT
- ✅ Gestion des rôles (Admin, Enseignant, Étudiant)
- ✅ Protection des routes par rôle
- ✅ Sessions sécurisées

### Gestion des Utilisateurs
- ✅ CRUD complet pour les utilisateurs
- ✅ Profils personnalisés par rôle
- ✅ Recherche et filtrage

### Gestion des Cours
- ✅ Création et modification de cours
- ✅ Clé d'inscription unique par cours
- ✅ Gestion de vidéos et documents
- ✅ Inscription des étudiants
- ✅ Recherche et filtres avancés

### Forums de Discussion
- ✅ Discussions par cours
- ✅ Système de réponses
- ✅ Marquage comme résolu

### Quiz et Évaluations
- ✅ Création de quiz avec questions à choix multiples
- ✅ Correction automatique
- ✅ Stockage des résultats
- ✅ Historique des tentatives

## 🚀 Installation

### Prérequis
- Node.js (v14 ou supérieur)
- MongoDB (local ou Atlas)

### Étapes d'installation

1. **Installer les dépendances**
\`\`\`bash
cd backend
npm install
\`\`\`

2. **Configurer les variables d'environnement**
Modifier le fichier `.env` si nécessaire :
\`\`\`env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/edulearn
JWT_SECRET=votre_secret_jwt
CLIENT_URL=http://localhost:5500
\`\`\`

3. **Démarrer MongoDB**
\`\`\`bash
# Si MongoDB est installé localement
mongod
\`\`\`

4. **Initialiser la base de données avec des données de test**
\`\`\`bash
npm run seed
\`\`\`

5. **Démarrer le serveur**
\`\`\`bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
\`\`\`

Le serveur sera accessible sur `http://localhost:3000`

## 📚 API Endpoints

### Authentification (`/api/auth`)
- `POST /register` - Inscription
- `POST /login` - Connexion
- `GET /me` - Profil utilisateur (protégé)
- `POST /logout` - Déconnexion (protégé)

### Utilisateurs (`/api/users`)
- `GET /` - Liste des utilisateurs (protégé)
- `GET /:id` - Détails d'un utilisateur (protégé)
- `POST /` - Créer un utilisateur (admin)
- `PUT /:id` - Modifier un utilisateur (admin)
- `DELETE /:id` - Supprimer un utilisateur (admin)

### Cours (`/api/courses`)
- `GET /` - Liste des cours (public)
- `GET /:id` - Détails d'un cours (public)
- `POST /` - Créer un cours (enseignant/admin)
- `PUT /:id` - Modifier un cours (enseignant/admin)
- `DELETE /:id` - Supprimer un cours (enseignant/admin)
- `POST /:id/enroll` - S'inscrire à un cours (étudiant)
- `POST /:id/videos` - Ajouter une vidéo (enseignant/admin)
- `POST /:id/documents` - Ajouter un document (enseignant/admin)

### Forums (`/api/forums`)
- `GET /course/:courseId` - Discussions d'un cours (protégé)
- `POST /` - Créer une discussion (protégé)
- `POST /:id/reply` - Ajouter une réponse (protégé)
- `PUT /:id/resolve` - Marquer comme résolu (protégé)
- `DELETE /:id` - Supprimer une discussion (protégé)

### Quiz (`/api/quizzes`)
- `GET /course/:courseId` - Quiz d'un cours (protégé)
- `GET /:id` - Détails d'un quiz (protégé)
- `POST /` - Créer un quiz (enseignant/admin)
- `POST /:id/submit` - Soumettre un quiz (étudiant)
- `GET /results/student/:studentId` - Résultats d'un étudiant (protégé)
- `DELETE /:id` - Supprimer un quiz (enseignant/admin)

## 🔐 Comptes de Test

Après avoir exécuté `npm run seed`, vous aurez accès à ces comptes :

**Admin:**
- Email: `admin@edulearn.com`
- Mot de passe: `admin123`

**Enseignants:**
- Email: `marie.dupont@edulearn.com` / Mot de passe: `teacher123`
- Email: `jean.martin@edulearn.com` / Mot de passe: `teacher123`

**Étudiants:**
- Email: `ahmed.benali@student.com` / Mot de passe: `student123`
- Email: `fatima.zahra@student.com` / Mot de passe: `student123`

**Clés d'inscription aux cours:**
- JavaScript: `JS2024`
- MongoDB: `MONGO2024`
- Node.js: `NODE2024`

## 🗂️ Structure du Projet

\`\`\`
backend/
├── config/
│   └── database.js          # Configuration MongoDB
├── controllers/
│   ├── authController.js    # Logique d'authentification
│   ├── userController.js    # Gestion des utilisateurs
│   ├── courseController.js  # Gestion des cours
│   ├── forumController.js   # Gestion des forums
│   └── quizController.js    # Gestion des quiz
├── middleware/
│   ├── auth.js              # Middleware d'authentification
│   └── error.js             # Gestion des erreurs
├── models/
│   ├── User.js              # Modèle utilisateur
│   ├── Course.js            # Modèle cours
│   ├── Forum.js             # Modèle forum
│   ├── Quiz.js              # Modèle quiz
│   └── QuizResult.js        # Modèle résultat quiz
├── routes/
│   ├── auth.js              # Routes d'authentification
│   ├── users.js             # Routes utilisateurs
│   ├── courses.js           # Routes cours
│   ├── forums.js            # Routes forums
│   └── quizzes.js           # Routes quiz
├── .env                     # Variables d'environnement
├── .gitignore
├── package.json
├── seed.js                  # Script d'initialisation
└── server.js                # Point d'entrée
\`\`\`

## 🔧 Technologies Utilisées

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification par token
- **bcryptjs** - Hashage des mots de passe
- **CORS** - Gestion des requêtes cross-origin

## 📝 Notes Importantes

1. **Sécurité**: Changez le `JWT_SECRET` en production
2. **CORS**: Ajustez `CLIENT_URL` selon votre frontend
3. **MongoDB**: Utilisez MongoDB Atlas pour la production
4. **Mots de passe**: Les mots de passe de test sont faibles, utilisez des mots de passe forts en production

## 🤝 Connexion avec le Frontend

Le frontend doit faire des requêtes à `http://localhost:3000/api`

Exemple de requête de connexion :
\`\`\`javascript
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@edulearn.com',
    password: 'admin123',
    role: 'admin'
  })
});

const data = await response.json();
console.log(data.token); // Token JWT à stocker
\`\`\`

## 📞 Support

Pour toute question ou problème, consultez la documentation ou créez une issue.

---

**Développé avec ❤️ pour EduLearn**
