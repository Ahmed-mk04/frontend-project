const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Helper to find user across collections
const findUserByEmail = async (email) => {
    let user = await Student.findOne({ email }).select('+password');
    if (user) return { user, role: 'student' };

    user = await Teacher.findOne({ email }).select('+password');
    if (user) return { user, role: 'teacher' };

    user = await Admin.findOne({ email }).select('+password');
    if (user) return { user, role: 'admin' };

    return null;
};

// Helper to find user by ID
const findUserById = async (id) => {
    let user = await Student.findById(id);
    if (user) return { user, role: 'student' };

    user = await Teacher.findById(id);
    if (user) return { user, role: 'teacher' };

    user = await Admin.findById(id);
    if (user) return { user, role: 'admin' };

    return null;
};

// Générer un token JWT incluant le rôle
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// @desc    Inscription d'un utilisateur
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, role, studentId, year, domain, grade } = req.body;

        const found = await findUserByEmail(email);
        if (found) {
            return res.status(400).json({
                success: false,
                message: 'Cet email est déjà utilisé'
            });
        }

        let user;
        const userData = { firstName, lastName, email, password };
        const userRole = role || 'student';

        if (userRole === 'teacher') {
            user = await Teacher.create({ ...userData, domain, grade });
        } else if (userRole === 'admin') {
            user = await Admin.create(userData);
        } else {
            // Student
            user = await Student.create({ ...userData, studentId, year });
        }

        // Générer le token
        const token = generateToken(user._id, userRole);

        res.status(201).json({
            success: true,
            message: 'Inscription réussie',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: userRole
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Connexion d'un utilisateur
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Veuillez fournir un email et un mot de passe'
            });
        }

        // Trouver l'utilisateur et son rôle (recherche multi-collections)
        const found = await findUserByEmail(email);

        if (!found) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        const { user, role } = found;

        // Vérifier le mot de passe
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        // Générer le token avec le rôle
        const token = generateToken(user._id, role);

        // Envoyer le token dans un cookie (optionnel)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
        });

        res.status(200).json({
            success: true,
            message: 'Connexion réussie',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: role
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir l'utilisateur connecté
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const found = await findUserById(req.user.id);

        if (!found) {
            // Should not happen if protect middleware works correctly
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({
            success: true,
            user: found.user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Déconnexion
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Déconnexion réussie'
    });
};
