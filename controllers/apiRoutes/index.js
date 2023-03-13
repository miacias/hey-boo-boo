const router = require('express').Router();
const userRoutes = require('./userRoutes');
const User = require('../../models');

router.use('/users', userRoutes);

module.exports = router;