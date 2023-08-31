
const { DataTypes } = require('sequelize')
const db = require('../../db/db')

const Reviews = db.define('Reviews', {
    reviewId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comment: {
        type: DataTypes.STRING(5000), 
        allowNull: true,
    }
})

module.exports = Reviews;
