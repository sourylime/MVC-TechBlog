// controllers/userController.js

const bcrypt = require('bcrypt');
const { User } = require('../models');

const userController = {
    // Example route handler for registering a new user
    registerUser: async (req, res) => {
        try {
            // Extract data from request body
            const { username, email, password } = req.body;

            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user record in the database
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
            });

            // Send a success response
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            // Handle errors
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Failed to register user', error: error.message });
        }
    },

    // Example route handler for fetching user profile
    getUserProfile: async (req, res) => {
        try {
            // Assume user is authenticated and their ID is stored in the session
            const userId = req.session.userId;

            // Retrieve user profile from the database
            const userProfile = await User.findByPk(userId);

            // Send the user profile as a response
            res.status(200).json(userProfile);
        } catch (error) {
            // Handle errors
            console.error('Error fetching user profile:', error);
            res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
        }
    },

    // More route handlers can be added here...
};

module.exports = userController;
