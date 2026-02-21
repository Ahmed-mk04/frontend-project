const Forum = require('../models/Forum');
const Course = require('../models/Course');

// @desc    Obtenir toutes les discussions d'un cours
// @route   GET /api/forums/:courseId
// @access  Private
exports.getForumsByCourse = async (req, res, next) => {
    try {
        const forums = await Forum.find({ course: req.params.courseId })
            .populate('author', 'firstName lastName avatar')
            .populate('replies.author', 'firstName lastName avatar')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: forums.length,
            data: forums
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Créer une discussion
// @route   POST /api/forums
// @access  Private
exports.createForum = async (req, res, next) => {
    try {
        const { course, title, content } = req.body;

        // Vérifier que le cours existe
        const courseExists = await Course.findById(course);
        if (!courseExists) {
            return res.status(404).json({
                success: false,
                message: 'Cours non trouvé'
            });
        }

        const forum = await Forum.create({
            course,
            author: req.user.id,
            title,
            content
        });

        await forum.populate('author', 'firstName lastName avatar');

        res.status(201).json({
            success: true,
            message: 'Discussion créée',
            data: forum
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Ajouter une réponse
// @route   POST /api/forums/:id/reply
// @access  Private
exports.addReply = async (req, res, next) => {
    try {
        const forum = await Forum.findById(req.params.id);

        if (!forum) {
            return res.status(404).json({
                success: false,
                message: 'Discussion non trouvée'
            });
        }

        forum.replies.push({
            author: req.user.id,
            content: req.body.content
        });

        await forum.save();
        await forum.populate('replies.author', 'firstName lastName avatar');

        res.status(200).json({
            success: true,
            message: 'Réponse ajoutée',
            data: forum
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Marquer comme résolu
// @route   PUT /api/forums/:id/resolve
// @access  Private
exports.resolveForum = async (req, res, next) => {
    try {
        const forum = await Forum.findById(req.params.id);

        if (!forum) {
            return res.status(404).json({
                success: false,
                message: 'Discussion non trouvée'
            });
        }

        forum.isResolved = true;
        await forum.save();

        res.status(200).json({
            success: true,
            message: 'Discussion marquée comme résolue',
            data: forum
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Supprimer une discussion
// @route   DELETE /api/forums/:id
// @access  Private
exports.deleteForum = async (req, res, next) => {
    try {
        const forum = await Forum.findById(req.params.id);

        if (!forum) {
            return res.status(404).json({
                success: false,
                message: 'Discussion non trouvée'
            });
        }

        // Seul l'auteur ou un admin peut supprimer
        if (forum.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Non autorisé'
            });
        }

        await forum.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Discussion supprimée'
        });
    } catch (error) {
        next(error);
    }
};
