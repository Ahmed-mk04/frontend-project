const express = require('express');
const router = express.Router();
const {
    getQuizzesByCourse,
    getQuiz,
    createQuiz,
    submitQuiz,
    getStudentResults,
    deleteQuiz
} = require('../controllers/quizController');
const { protect, restrictTo } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(protect);

router.get('/course/:courseId', getQuizzesByCourse);
router.get('/results/student/:studentId', getStudentResults);
router.get('/:id', getQuiz);
router.post('/', restrictTo('teacher', 'admin'), createQuiz);
router.post('/:id/submit', restrictTo('student'), submitQuiz);
router.delete('/:id', restrictTo('teacher', 'admin'), deleteQuiz);

module.exports = router;
