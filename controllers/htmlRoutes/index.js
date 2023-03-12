const router = require('express').Router();
const htmlRoutes = require('./htmlRoutes');
// const { User, Picnic, Food } = require('../../models');

router.use('/', htmlRoutes);

module.exports = router;