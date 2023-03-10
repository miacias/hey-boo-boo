const User = require('./User.js');
const Picnic = require('./Picnic.js');
const Food = require('./Food.js');

// many to many - User:Picnic through Food
User.belongsToMany(Picnic, {
    through: {
        model: Food,
        unique: false
      },
      as: 'invitees'
});

Picnic.belongsToMany(User, {
    through: {
        model: Food,
        unique: false
      },
      as: 'events'
});

module.exports = { User, Picnic, Food };