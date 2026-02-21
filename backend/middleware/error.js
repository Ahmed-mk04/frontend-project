// Middleware de gestion des erreurs
exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Erreur de validation Mongoose
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: 'Erreur de validation',
            errors
        });
    }

    // Erreur de duplication (clé unique)
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            success: false,
            message: `Ce ${field} existe déjà`
        });
    }

    // Erreur JWT
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Token invalide'
        });
    }

    // Erreur par défaut
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Erreur serveur'
    });
};

// Middleware pour les routes non trouvées
exports.notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} non trouvée`
    });
};
