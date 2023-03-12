const router = require('express').Router();
const htmlRoutes = require('./htmlRoutes');
// const { User, Picnic, Food } = require('../../models');

router.use('/users', htmlRoutes);

module.exports = router;