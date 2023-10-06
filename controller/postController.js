const Post = require('../models/post');
const User = require('../models/user');


module.exports.createPost = async (req, res) => {
    try {

        //extracting the post data from request body
        const post = req.body;

        // checking if user with userid exists
        const user = await User.find({
            'email': post.userId
        });

        if (user.length == 0) {
            res.status(400).json({
                "message": "User does not exists",
                success: false
            });
        } else {

            //making Post details object
            const postData = {
                userId: post.userId,
                content: post.content
            }

            //creating new post object
            const newPost = new Post(postData);

            //saving the new post object to the database
            newPost.save().then(response => {
                    res.status(200).json({
                        message: 'Post created successfully',
                        success: true
                    })
                })
                .catch(error => {
                    res.status(401).json({
                        message: 'Failed to create Post',
                        success: false,
                        error: error.message
                    })
                });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Failed to create Post, server error',
            success: false,
            error: error.message
        })
    }
}


module.exports.getUserPosts = async (req, res) => {
    try {

        //geting user id from the request parameter
        const userId = req.params.userId;

        // checking if user exists
        const user = await User.find({
            'email': userId
        });

        if (user.length == 0) {
            res.status(400).json({
                "message": "User does not exists",
                success: false
            });
        } else {

            //fetching user posts
            const userPosts = await Post.find({
                'userId': userId
            }, {
                content: 1
            });

            res.status(200).json({
                "posts": userPosts,
                "success": true
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch user posts, server error',
            success: false,
            error: error.message
        })
    }
}

module.exports.deletePostById = async (req, res) => {
    try {

        //extracting post od from the request parameter
        const postId = req.params.postId;

        //deleting the post using the post id, if it exists
        Post.deleteOne({
            _id: postId
        }).then(response => {
            if (response.deletedCount != 0) {
                res.status(200).json({
                    "message": "Post deleted successfully",
                    success: true
                });
            } else {
                res.status(401).json({
                    "message": "Post not found",
                    success: false
                });
            }
        }).catch(err => {
            res.status(401).json({
                "message": "failed to delete post",
                success: false,
                error: err.message
            });
        })

    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete post, server error',
            success: false,
            error: error.message
        })
    }
}