const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Obtenir tous les cours
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res, next) => {
    try {
        const { search, category, level } = req.query;

        let query = {};
        console.log("getCourses query params:", req.query);

        // Recherche par titre ou description
        if (search) {
            query.$text = { $search: search };
        }

        // Filtrer par catégorie
        if (category) {
            query.category = category;
        }

        // Filtrer par niveau
        if (level) {
            query.level = level;
        }

        const courses = await Course.find(query)
            .populate('teacher', 'firstName lastName email domain')
            .populate('enrolledStudents', 'firstName lastName email')
            .sort('-createdAt');
        console.log(`Found ${courses.length} courses`);

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir un cours par ID
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('teacher', 'firstName lastName email domain avatar')
            .populate('enrolledStudents', 'firstName lastName email');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Cours non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Créer un cours
// @route   POST /api/courses
// @access  Private/Teacher/Admin
// @desc    Créer un cours
// @route   POST /api/courses
// @access  Private/Teacher/Admin
// @desc    Créer un cours
// @route   POST /api/courses
// @access  Private/Teacher/Admin
exports.createCourse = async (req, res, next) => {
    try {
        let teacherId;

        // Si c'est un enseignant qui crée le cours, il est forcément l'enseignant
        if (req.user.role === 'teacher') {
            teacherId = req.user._id;
        } else {
            // Si c'est un admin, il peut spécifier l'enseignant
            const { teacher } = req.body;
            teacherId = teacher;

            // Si teacher est un email, trouver l'ID
            if (teacher && teacher.toString().includes('@')) {
                // Must import Teacher model if not already imported at top? 
                // We will assume imports are present or use mongoose.model
                const Teacher = require('../models/Teacher');
                const teacherUser = await Teacher.findOne({ email: teacher });
                if (!teacherUser) {
                    return res.status(404).json({
                        success: false,
                        message: 'Enseignant non trouvé avec cet email'
                    });
                }
                teacherId = teacherUser._id;
            }
        }

        if (!teacherId) {
            return res.status(400).json({
                success: false,
                message: 'Veuillez spécifier un enseignant'
            });
        }

        const Teacher = require('../models/Teacher');
        const teacherExists = await Teacher.findById(teacherId); // Direct ID check
        if (!teacherExists) {
            return res.status(400).json({
                success: false,
                message: 'L\'enseignant spécifié n\'existe pas ou n\'a pas le rôle enseignant'
            });
        }

        // Explicitly handle boolean conversion for isPublic to avoid string "false" issues
        let isPublic = true;
        if (req.body.isPublic === false || req.body.isPublic === 'false') {
            isPublic = false;
        }

        const courseData = {
            ...req.body,
            teacher: teacherId,
            isPublic: isPublic
        };
        console.log(`Creating course: ${courseData.title}, isPublic: ${isPublic}`);

        const course = await Course.create(courseData);

        // Populate pour retourner les infos complètes
        await course.populate('teacher', 'firstName lastName email domain');

        res.status(201).json({
            success: true,
            message: 'Cours créé avec succès',
            data: course
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Mettre à jour un cours
// @route   PUT /api/courses/:id
// @access  Private/Teacher/Admin
exports.updateCourse = async (req, res, next) => {
    try {
        let course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Cours non trouvé'
            });
        }

        // Vérifier que l'utilisateur est le propriétaire ou admin
        if (course.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Non autorisé à modifier ce cours'
            });
        }

        // Note: if body contains teacher, we might need validation again, but let's assume update logic holds.

        course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('teacher', 'firstName lastName email');

        res.status(200).json({
            success: true,
            message: 'Cours mis à jour',
            data: course
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Supprimer un cours
// @route   DELETE /api/courses/:id
// @access  Private/Teacher/Admin
exports.deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Cours non trouvé'
            });
        }

        // Vérifier que l'utilisateur est le propriétaire ou admin
        if (course.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Non autorisé à supprimer ce cours'
            });
        }

        await course.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Cours supprimé'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Inscrire un étudiant à un cours
// @route   POST /api/courses/:id/enroll
// @access  Private/Student
exports.enrollCourse = async (req, res, next) => {
    try {
        const { enrollmentKey } = req.body;
        const course = await Course.findById(req.params.id);
        const Student = require('../models/Student'); // Import locally or at top

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Cours non trouvé'
            });
        }

        // Verify user is a student
        if (req.user.role !== 'student') {
            return res.status(403).json({
                success: false,
                message: 'Seuls les étudiants peuvent s\'inscrire aux cours'
            });
        }

        // Vérifier la clé d'inscription UNIQUEMENT si le cours n'est pas public
        if (!course.isPublic) {
            // Comparaison stricte de la clé
            // On vérifie aussi si la clé est définie dans le cours
            if (!course.enrollmentKey || course.enrollmentKey !== enrollmentKey) {
                return res.status(400).json({
                    success: false,
                    message: 'Clé d\'inscription invalide pour ce cours privé'
                });
            }
        }

        // Vérifier si déjà inscrit
        if (course.enrolledStudents.includes(req.user.id)) {
            return res.status(400).json({
                success: false,
                message: 'Vous êtes déjà inscrit à ce cours'
            });
        }

        // Ajouter l'étudiant au cours
        course.enrolledStudents.push(req.user.id);
        await course.save();

        // Ajouter le cours à l'étudiant
        await Student.findByIdAndUpdate(req.user.id, {
            $push: { enrolledCourses: course._id }
        });

        res.status(200).json({
            success: true,
            message: 'Inscription réussie au cours'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Ajouter une vidéo à un cours
// @route   POST /api/courses/:id/videos
// @access  Private/Teacher/Admin
exports.addVideo = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Cours non trouvé'
            });
        }

        course.videos.push(req.body);
        await course.save();

        res.status(200).json({
            success: true,
            message: 'Vidéo ajoutée',
            data: course
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Ajouter un document à un cours
// @route   POST /api/courses/:id/documents
// @access  Private/Teacher/Admin
exports.addDocument = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Cours non trouvé'
            });
        }

        course.documents.push(req.body);
        await course.save();

        res.status(200).json({
            success: true,
            message: 'Document ajouté',
            data: course
        });
    } catch (error) {
        next(error);
    }
};
