const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
        type: DataTypes.DATETIME,
        allowNull: false
     },
     join_password: {
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
            model: "user",
            key: "id"
        }
     },
     invitee_role: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "user",
            key: "id"
        }
     },
     foods: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: "food",
            key: "id"
        }
     }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
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