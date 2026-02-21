const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');

// Middleware pour protéger les routes
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Vérifier si le token existe dans les headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Non autorisé. Veuillez vous connecter.'
            });
        }

        // Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Récupérer l'utilisateur
        let user;

        // Optimisation: si le rôle est dans le token (nouveaux tokens)
        if (decoded.role) {
            if (decoded.role === 'student') user = await Student.findById(decoded.id).select('-password');
            else if (decoded.role === 'teacher') user = await Teacher.findById(decoded.id).select('-password');
            else if (decoded.role === 'admin') user = await Admin.findById(decoded.id).select('-password');
        }

        // Fallback: chercher partout (anciens tokens ou erreur)
        if (!user) {
            let foundUser = await Student.findById(decoded.id).select('-password');
            if (foundUser) { user = foundUser; if (!user.role) user.role = 'student'; }

            if (!user) {
                foundUser = await Teacher.findById(decoded.id).select('-password');
                if (foundUser) { user = foundUser; if (!user.role) user.role = 'teacher'; }
            }

            if (!user) {
                foundUser = await Admin.findById(decoded.id).select('-password');
                if (foundUser) { user = foundUser; if (!user.role) user.role = 'admin'; }
            }
        } else {
            // If found via decoded.role, ensure role is consistent?
            // Mongoose document might be immutable, so user.role modification might fail if strict.
            // Converting to object helpful? No, req.user usually is mongoose doc.
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Utilisateur non trouvé'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: 'Token invalide ou expiré'
        });
    }
};

// Middleware pour restreindre l'accès par rôle
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Vous n\'avez pas la permission d\'effectuer cette action'
            });
        }
        next();
    };
};
