const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const Course = require('../models/Course');

// @desc    Obtenir tous les quiz d'un cours
// @route   GET /api/quizzes/course/:courseId
// @access  Private
exports.getQuizzesByCourse = async (req, res, next) => {
    try {
        const quizzes = await Quiz.find({
            course: req.params.courseId,
            isActive: true
        }).select('-questions.correctAnswer'); // Ne pas envoyer les réponses

        res.status(200).json({
            success: true,
            count: quizzes.length,
            data: quizzes
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir un quiz par ID
// @route   GET /api/quizzes/:id
// @access  Private
exports.getQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
            .select('-questions.correctAnswer'); // Ne pas envoyer les réponses

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            data: quiz
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Créer un quiz
// @route   POST /api/quizzes
// @access  Private/Teacher/Admin
exports.createQuiz = async (req, res, next) => {
    try {
        const { course } = req.body;

        // Vérifier que le cours existe
        const courseExists = await Course.findById(course);
        if (!courseExists) {
            return res.status(404).json({
                success: false,
                message: 'Cours non trouvé'
            });
        }

        const quiz = await Quiz.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Quiz créé avec succès',
            data: quiz
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Soumettre un quiz
// @route   POST /api/quizzes/:id/submit
// @access  Private/Student
exports.submitQuiz = async (req, res, next) => {
    try {
        const { answers } = req.body; // Array of { questionIndex, selectedAnswer }

        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz non trouvé'
            });
        }

        // Calculer le score
        let score = 0;
        let totalPoints = 0;

        quiz.questions.forEach((question, index) => {
            totalPoints += question.points;
            const studentAnswer = answers.find(a => a.questionIndex === index);

            if (studentAnswer && studentAnswer.selectedAnswer === question.correctAnswer) {
                score += question.points;
            }
        });

        const percentage = (score / totalPoints) * 100;
        const passed = percentage >= quiz.passingScore;

        // Sauvegarder le résultat
        const result = await QuizResult.create({
            quiz: quiz._id,
            student: req.user.id,
            answers,
            score,
            totalPoints,
            percentage,
            passed
        });

        res.status(200).json({
            success: true,
            message: passed ? 'Quiz réussi !' : 'Quiz échoué',
            data: {
                score,
                totalPoints,
                percentage,
                passed,
                resultId: result._id
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir les résultats d'un étudiant
// @route   GET /api/quizzes/results/student/:studentId
// @access  Private
exports.getStudentResults = async (req, res, next) => {
    try {
        const results = await QuizResult.find({ student: req.params.studentId })
            .populate('quiz', 'title course')
            .populate({
                path: 'quiz',
                populate: {
                    path: 'course',
                    select: 'title'
                }
            })
            .sort('-completedAt');

        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Supprimer un quiz
// @route   DELETE /api/quizzes/:id
// @access  Private/Teacher/Admin
exports.deleteQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Quiz supprimé'
        });
    } catch (error) {
        next(error);
    }
};
