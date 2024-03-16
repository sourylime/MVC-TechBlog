// controllers/postController.js
const Post = require('../models/Post');

// Controller functions for handling post-related requests
module.exports = {
    getAllPosts: async (_, res) => {
        // Logic to fetch all posts from the database
        try {
            const posts = await Post.findAll();
            res.status(200).json(posts);
        }
        catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
        }


    },
    getPostById: async (req, res) => {
        // Logic to fetch a post by its ID from the database
        try {
            const post = await Post.findByPk(req.params.id);
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        }
        catch (error) {
            console.error('Error fetching post by ID:', error);
            res.status(500).json({ message: 'Failed to fetch post', error: error.message });
        }


    },
    createPost: async (req, res) => {
        // Logic to create a new post in the database
        try {
            const { title, content } = req.body;
            const newPost = await Post.create({
                title,
                content,
            });
            res.status(201).json({ message: 'Post created successfully', post: newPost });
        }
        catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ message: 'Failed to create post', error: error.message });
        }


    },
    updatePost: async (req, res) => {
        // Logic to update an existing post in the database
        try {
            const { title, content } = req.body;
            const updatedPost = await Post.update({
                title,
                content,
            }, {
                where: { id: req.params.id }
            });
            if (updatedPost) {
                res.status(200).json({ message: 'Post updated successfully' });
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        }
        catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ message: 'Failed to update post', error: error.message });
        }
    },
    deletePost: async (req, res) => {
        // Logic to delete a post from the database
        try {
            const deletedPost = await Post.destroy({
                where: { id: req.params.id }
            });
            if (deletedPost) {
                res.status(200).json({ message: 'Post deleted successfully' });
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        }
        catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ message: 'Failed to delete post', error: error.message });
        }
    }


};


