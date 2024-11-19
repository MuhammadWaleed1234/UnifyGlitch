const express = require('express');
const postController = require('../controllers/postController');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Existing Routes
router.get('/all', postController.getAllPosts);
router.put('/:postId/report', postController.reportPost);
router.put('/:postId/done', postController.toggleDoneStatus);
router.delete('/user/:userId', postController.deleteUserPosts);
router.delete('/:postId', postController.deletePost);
router.put('/:postId', postController.updatePost);
router.post('/', postController.addPost);
router.delete('/', postController.deleteAllPosts);
router.get('/category', postController.getPostsByCategory);
router.get('/user/:userId', postController.getOwnPosts);

// New Admin Routes
router.get('/reported', adminMiddleware.verifyAdmin, postController.getReportedPosts); // Admin Only
router.put('/:postId/unreport', adminMiddleware.verifyAdmin, postController.unreportPost); // Admin Only

module.exports = router;
