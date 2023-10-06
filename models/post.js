const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        default: null
    },
}, {
    timestamps: true
})

const Post = mongoose.model('post', postSchema);

module.exports = Post;