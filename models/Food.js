const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../config/connection.js');

class Food extends Model {}

Food.init(
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
    },
    // warning: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    //     references: {
    //         model: "warning",
    //         key: "id"
    //     }
    // },
    picnic_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "picnics",
        key: "id",
        unique: false
    }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
        unique: false
    }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'food',
  }
);

module.exports = Food;