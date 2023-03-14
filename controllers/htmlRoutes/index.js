const router = require('express').Router();
const htmlRoutes = require('./htmlRoutes');
const picnic = require('./picnic');
// const { User, Picnic, Food } = require('../../models');

router.use('/', htmlRoutes);
router.use('/picnic', picnic)

module.exports = router;