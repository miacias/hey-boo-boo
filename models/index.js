const User = require('./User.js');
const Picnic = require('./Picnic.js');
const Food = require('./Food.js');

// one to many - User:Food
User.hasMany(Food, {
    foreignKey: 'user_id'
});

Food.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// one to many - Picnic:Food
Picnic.hasMany(Food, {
    foreignKey: 'food_id'
});

Food.hasOne(Picnic, {
    foreignKey: 'food_id',
    onDelete: 'CASCADE'
});

// many to many - User:Picnic
User.belongsToMany(Picnic, {
    through: {
        model: Food,
        unique: false
      }
});

Picnic.belongsToMany(User, {
    through: {
        model: Food,
        unique: false
      }
});

module.exports = { User, Picnic, Food };