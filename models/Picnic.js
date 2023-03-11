const { Model, DataTypes, NOW } = require('sequelize');
const bcrypt = require('bcrypt');
const {sequelize} = require('../config/connection.js');

class Picnic extends Model {}

Picnic.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
     },
     start_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // add real dates later (REMOVE THIS)
        allowNull: false
     },
     password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
     },
     creator_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
     }
  },
  {
    hooks: {
      beforeCreate: async (newPicnicData) => {
        newPicnicData.password = await bcrypt.hash(newPicnicData.password, 10);
        return newPicnicData;
      },
      beforeUpdate: async (updatedPicnicData) => {
        updatedPicnicData.password = await bcrypt.hash(updatedPicnicData.password, 10);
        return updatedPicnicData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'picnic',
  }
);

module.exports = Picnic;