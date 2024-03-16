// controllers/replyController.js
const Reply = require('../models/Reply');

// Controller functions for handling reply-related requests
module.exports = {
    getAllReplies: async (_, res) => {
        // Logic to fetch all replies from the database
        try {
            const replies = await Reply.findAll();
            res.status(200).json(replies);
        }
        catch (error) {
            console.error('Error fetching replies:', error);
            res.status(500).json({ message: 'Failed to fetch replies', error: error.message });
        }

    },
    getReplyById: async (req, res) => {
        // Logic to fetch a reply by its ID from the database
        try {
            const reply = await Reply.findByPk(req.params.id);
            if (reply) {
                res.status(200).json(reply);
            } else {
                res.status(404).json({ message: 'Reply not found' });
            }
        }
        catch (error) {
            console.error('Error fetching reply by ID:', error);
            res.status(500).json({ message: 'Failed to fetch reply', error: error.message });
        }
    },
    createReply: async (req, res) => {
        // Logic to create a new reply in the database
        try {
            const { reply_text, user_id, post_id } = req.body;
            const newReply = await Reply.create({
                reply_text,
                user_id,
                post_id,
            });
            res.status(201).json({ message: 'Reply created successfully', reply: newReply });
        }
        catch (error) {
            console.error('Error creating reply:', error);
            res.status(500).json({ message: 'Failed to create reply', error: error.message });
        }
    },
    updateReply: async (req, res) => {
        // Logic to update an existing reply in the database
        try {
            const { reply_text } = req.body;
            const updatedReply = await Reply.update({
                reply_text,
            }, {
                where: {
                    id: req.params.id
                }
            });
            if (updatedReply) {
                res.status(200).json({ message: 'Reply updated successfully' });
            } else {
                res.status(404).json({ message: 'Reply not found' });
            }
        }
        catch (error) {
            console.error('Error updating reply:', error);
            res.status(500).json({ message: 'Failed to update reply', error: error.message });
        }
    },
    deleteReply: async (req, res) => {
        // Logic to delete a reply from the database
        try {
            const deletedReply = await Reply.destroy({
                where: {
                    id: req.params.id
                }
            });
            if (deletedReply) {
                res.status(200).json({ message: 'Reply deleted successfully' });
            } else {
                res.status(404).json({ message: 'Reply not found' });
            }
        }
        catch (error) {
            console.error('Error deleting reply:', error);
            res.status(500).json({ message: 'Failed to delete reply', error: error.message });
        }
    }
};

