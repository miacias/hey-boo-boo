const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Warning extends Model {}

Warning.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'warning',
  }
);

module.exports = Warning;