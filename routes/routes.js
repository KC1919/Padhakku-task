const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const postController = require('../controller/postController');

router
    .post('/signup', authController.register)
    .post('/posts', postController.createPost)
    .get('/posts/:userId', postController.getUserPosts)
    .delete('/deletepost/:postId', postController.deletePostById)


module.exports = router;