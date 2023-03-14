const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection.js');

// a person who uses food-picnics
// reference of how a food is associated with an event
// food is related to event, specifically by which event and which user
class FoodPicnicUser extends Model { }

FoodPicnicUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: false,
        underscored: true,
        modelName: 'foodPicnicUser',
    }
);

module.exports = FoodPicnicUser;