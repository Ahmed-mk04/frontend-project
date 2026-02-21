const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(protect);

router
    .route('/')
    .get(getUsers)
    .post(restrictTo('admin'), createUser);

router
    .route('/:id')
    .get(getUser)
    .put(restrictTo('admin'), updateUser)
    .delete(restrictTo('admin'), deleteUser);

module.exports = router;
