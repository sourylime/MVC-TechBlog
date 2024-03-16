const { dataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Reply extends Model { }

Reply.init(
    {
        reply_text: {
            type: dataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize
    }
);

module.exports = Reply;

