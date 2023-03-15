// sequelize models
const {sequelize} = require('../config/connection.js');
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../models');

// raw JSON starter data files
const userData = require('./userData.json');
const picnicData = require('./picnicData.json');
const foodData = require('./foodData.json')

const picnicUser = require('./picnicUser.json')
const foodPicnicUser = require('./foodPicnicUser.json')

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
    // await sequelize.sync({force: true});
    const foods = await Food.bulkCreate(foodData) 
    //     {
    //     individualHooks: true,
    //     returning: true
    // });
    // await sequelize.sync({force: true});
    const picnicUsers = await PicnicUser.bulkCreate(picnicUser)
    // , {
    //     individualHooks: true,
    //     returning: true
    // });
    // await sequelize.sync({force: true});
    const foodPicnicUsers = await FoodPicnicUser.bulkCreate(foodPicnicUser)
    // , {
    //     individualHooks: true,
    //     returning: true
    // });

    // ends MySQL connection
    process.exit(0);
};

seedDatabase();