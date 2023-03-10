// sequelize models
const {sequelize} = require('../config/connection.js');
const { User, Picnic } = require('../models');

// raw JSON starter data files
const userData = require('./userData.json');
const picnicData = require('./picnicData.json');

const seedDatabase = async () => {
    // seeds users
    await sequelize.sync({force: true});
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    // seeds picnics
    const picnics = await Picnic.bulkCreate(picnicData, {
        individualHooks: true,
        returning: true
    });

    // ends MySQL connection
    process.exit(0);
};

seedDatabase();