const router = require('express').Router();
const userRoutes = require('./userRoutes');
const { User, Picnic, Food } = require('../../models');

router.use('/users', userRoutes);

module.exports = router;