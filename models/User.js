// Define the User model

const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // assuming you've configured Sequelize instance in a separate file

const User = sequelize.define('User', {
    // Define model attributes/columns
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Define additional options
    timestamps: true // Automatically include createdAt and updatedAt fields
});

module.exports = User;
