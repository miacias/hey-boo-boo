const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const htmlRoutes = require('./htmlRoutes');

router.use('/users', userRoutes);

module.exports = router;
