const router = require('express').Router();
const userRoutes = require('../apiRoutes');
// const { User, Picnic, Food } = require('../../models');

router.use('/users', userRoutes);

module.exports = router;
