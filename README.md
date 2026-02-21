# 🎓 EduLearn - Plateforme E-Learning Full Stack

Une plateforme d'apprentissage en ligne complète développée avec **Node.js**, **Express**, **MongoDB** et **HTML/CSS/JavaScript**.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.0-green.svg)

## 📋 Table des Matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Documentation](#documentation)
- [Structure du Projet](#structure-du-projet)
- [API](#api)
- [Comptes de Test](#comptes-de-test)

## 🎯 Aperçu

EduLearn est une plateforme e-learning complète qui permet aux étudiants d'informatique d'accéder à des cours en ligne, de passer des quiz, de participer à des forums de discussion et bien plus encore.

### Caractéristiques Principales

- 🔐 **Authentification sécurisée** avec JWT
- 👥 **Gestion des rôles** (Admin, Enseignant, Étudiant)
- 📚 **Gestion complète des cours** avec vidéos et documents
- 🔑 **Système d'inscription** avec clé unique par cours
- 💬 **Forums de discussion** pour chaque cours
- 📝 **Quiz interactifs** avec correction automatique
- 📊 **Dashboard administrateur** complet
- 🎨 **Interface moderne** et responsive

## ✨ Fonctionnalités

### Pour les Administrateurs
- ✅ Gestion complète des utilisateurs (CRUD)
- ✅ Gestion complète des cours (CRUD)
- ✅ Visualisation de toutes les statistiques
- ✅ Contrôle total de la plateforme

### Pour les Enseignants
- ✅ Création et gestion de cours
- ✅ Ajout de vidéos et documents
- ✅ Création de quiz personnalisés
- ✅ Gestion des forums de discussion
- ✅ Suivi des étudiants inscrits

### Pour les Étudiants
- ✅ Inscription aux cours avec clé
- ✅ Accès aux vidéos et documents de cours
- ✅ Passage de quiz avec résultats instantanés
- ✅ Participation aux forums
- ✅ Suivi de progression personnalisé

## 🛠️ Technologies

### Backend
- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification par token
- **bcryptjs** - Hashage des mots de passe

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling moderne
- **JavaScript (ES6+)** - Logique client
- **Fetch API** - Communication avec le backend

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) (v14 ou supérieur)
- [MongoDB](https://www.mongodb.com/try/download/community) (local ou Atlas)
- Un navigateur web moderne

### Étapes d'Installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd frontend-project
```

2. **Installer MongoDB**
   - **Option 1 - Local:** Téléchargez et installez MongoDB Community Server
   - **Option 2 - Cloud:** Créez un compte gratuit sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

3. **Configurer le Backend**
```bash
cd backend
npm install
```

4. **Configurer les variables d'environnement**
   - Le fichier `.env` est déjà configuré pour un usage local
   - Si vous utilisez MongoDB Atlas, modifiez `MONGODB_URI` dans `.env`

5. **Initialiser la base de données**
```bash
npm run seed
```

6. **Démarrer le serveur**
```bash
npm run dev
```

Le backend sera accessible sur `http://localhost:3000`

7. **Ouvrir le Frontend**
   - Utilisez Live Server (VS Code) pour ouvrir `index.html`
   - OU ouvrez directement `index.html` dans votre navigateur

## 💻 Utilisation

### Démarrage Rapide (Windows)

Double-cliquez sur `START_EDULEARN.bat` à la racine du projet. Ce script va :
1. Vérifier que Node.js est installé
2. Démarrer MongoDB (si installé localement)
3. Installer les dépendances
4. Démarrer le serveur backend

### Démarrage Manuel

1. **Démarrer MongoDB** (si local)
```bash
mongod
```

2. **Démarrer le Backend**
```bash
cd backend
npm run dev
```

3. **Ouvrir le Frontend**
   - Ouvrez `index.html` avec Live Server
   - OU naviguez vers `http://localhost:5500`

### Première Connexion

1. Allez sur `http://localhost:5500/auth/login.html`
2. Utilisez un des comptes de test (voir section [Comptes de Test](#comptes-de-test))
3. Explorez la plateforme selon votre rôle !

## 📚 Documentation

- **[GUIDE_DEMARRAGE.md](GUIDE_DEMARRAGE.md)** - Guide de démarrage détaillé
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Architecture technique complète
- **[backend/README.md](backend/README.md)** - Documentation de l'API

## 📁 Structure du Projet

```
frontend-project/
│
├── backend/                    # Backend Node.js
│   ├── config/                # Configuration (DB)
│   ├── controllers/           # Logique métier
│   ├── middleware/            # Middlewares (auth, errors)
│   ├── models/                # Modèles MongoDB
│   ├── routes/                # Routes API
│   ├── .env                   # Variables d'environnement
│   ├── server.js              # Point d'entrée
│   ├── seed.js                # Script d'initialisation
│   └── package.json           # Dépendances
│
├── auth/                      # Pages d'authentification
│   ├── login.html            # Page de connexion/inscription
│   ├── login.css             # Styles
│   └── login.js              # Logique client
│
├── cours/                     # Pages de cours
│   ├── listecours.html       # Liste des cours
│   ├── cours.html            # Détails d'un cours
│   ├── videos.html           # Vidéos
│   ├── docs.html             # Documents
│   ├── quiz.html             # Quiz
│   └── forum.html            # Forum
│
├── assets/                    # Ressources statiques
│   ├── css/                  # Feuilles de style
│   └── images/               # Images
│
├── dashboard-admin.html       # Dashboard administrateur
├── dashboard.html             # Dashboard étudiant
├── enseignant.html           # Dashboard enseignant
├── index.html                # Page d'accueil
│
├── GUIDE_DEMARRAGE.md        # Guide de démarrage
├── ARCHITECTURE.md           # Documentation technique
├── START_EDULEARN.bat        # Script de démarrage Windows
└── README.md                 # Ce fichier
```

## 🔌 API

### Endpoints Principaux

**Authentification**
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

**Utilisateurs**
- `GET /api/users` - Liste des utilisateurs
- `POST /api/users` - Créer un utilisateur (Admin)
- `PUT /api/users/:id` - Modifier un utilisateur (Admin)
- `DELETE /api/users/:id` - Supprimer un utilisateur (Admin)

**Cours**
- `GET /api/courses` - Liste des cours
- `POST /api/courses` - Créer un cours (Enseignant/Admin)
- `POST /api/courses/:id/enroll` - S'inscrire à un cours (Étudiant)
- `POST /api/courses/:id/videos` - Ajouter une vidéo
- `POST /api/courses/:id/documents` - Ajouter un document

**Forums**
- `GET /api/forums/course/:courseId` - Discussions d'un cours
- `POST /api/forums` - Créer une discussion
- `POST /api/forums/:id/reply` - Ajouter une réponse

**Quiz**
- `GET /api/quizzes/course/:courseId` - Quiz d'un cours
- `POST /api/quizzes` - Créer un quiz (Enseignant/Admin)
- `POST /api/quizzes/:id/submit` - Soumettre un quiz (Étudiant)

Pour la documentation complète de l'API, consultez [backend/README.md](backend/README.md)

## 🔐 Comptes de Test

Après avoir exécuté `npm run seed`, vous aurez accès à ces comptes :

### Administrateur
```
Email: admin@edulearn.com
Mot de passe: admin123
```

### Enseignants
```
Email: marie.dupont@edulearn.com
Mot de passe: teacher123
Domaine: Programmation Web

Email: jean.martin@edulearn.com
Mot de passe: teacher123
Domaine: Base de données
```

### Étudiants
```
Email: ahmed.benali@student.com
Mot de passe: student123
ID: STU001

Email: fatima.zahra@student.com
Mot de passe: student123
ID: STU002
```

### Clés d'Inscription aux Cours
```
JavaScript: JS2024
MongoDB: MONGO2024
Node.js: NODE2024
```

## 🔧 Configuration

### Variables d'Environnement (backend/.env)

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/edulearn
JWT_SECRET=votre_secret_jwt_super_securise
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5500
```

⚠️ **Important:** Changez `JWT_SECRET` en production !

## 🐛 Dépannage

### Le backend ne démarre pas
- Vérifiez que MongoDB est démarré
- Vérifiez que le port 3000 n'est pas déjà utilisé
- Vérifiez le fichier `.env`

### Erreur de connexion au serveur
- Assurez-vous que le backend est démarré sur le port 3000
- Vérifiez la console du navigateur pour les erreurs CORS
- Vérifiez que l'URL dans le frontend est correcte

### Erreur MongoDB
- Assurez-vous que MongoDB est installé et démarré
- Vérifiez l'URI dans le fichier `.env`
- Pour MongoDB Atlas, vérifiez que votre IP est autorisée

## 📝 Licence

Ce projet est développé à des fins éducatives.

## 👨‍💻 Auteur

Développé avec ❤️ pour le projet Mini Projet Dev Web Avancée

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.

## 📞 Support

Pour toute question ou problème :
1. Consultez la [documentation](GUIDE_DEMARRAGE.md)
2. Vérifiez les [issues existantes]
3. Créez une nouvelle issue si nécessaire

---

**Bon apprentissage avec EduLearn ! 🎓**
