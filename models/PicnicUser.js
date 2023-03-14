const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection.js');

class PicnicUser extends Model { }

PicnicUser.init(
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
        modelName: 'picnicUser',
    }
);

module.exports = PicnicUser;