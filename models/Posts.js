const { dataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

const Post = sequelize.define('Post', {
    title: {
        type: dataTypes.STRING,
        allowNull: false
    },
    content: {
        type: dataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: dataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
});

module.exports = Post;
