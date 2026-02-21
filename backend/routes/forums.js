const express = require('express');
const router = express.Router();
const {
    getForumsByCourse,
    createForum,
    addReply,
    resolveForum,
    deleteForum
} = require('../controllers/forumController');
const { protect } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(protect);

router.get('/course/:courseId', getForumsByCourse);
router.post('/', createForum);
router.post('/:id/reply', addReply);
router.put('/:id/resolve', resolveForum);
router.delete('/:id', deleteForum);

module.exports = router;
