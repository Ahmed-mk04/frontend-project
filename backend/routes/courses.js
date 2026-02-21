const express = require('express');
const router = express.Router();
const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollCourse,
    addVideo,
    addDocument
} = require('../controllers/courseController');
const { protect, restrictTo } = require('../middleware/auth');

// Routes publiques
router.get('/', getCourses);
router.get('/:id', getCourse);

// Routes protégées
router.post('/', protect, restrictTo('teacher', 'admin'), createCourse);
router.put('/:id', protect, restrictTo('teacher', 'admin'), updateCourse);
router.delete('/:id', protect, restrictTo('teacher', 'admin'), deleteCourse);

// Inscription à un cours
router.post('/:id/enroll', protect, restrictTo('student'), enrollCourse);

// Ajouter du contenu
router.post('/:id/videos', protect, restrictTo('teacher', 'admin'), addVideo);
router.post('/:id/documents', protect, restrictTo('teacher', 'admin'), addDocument);

module.exports = router;
