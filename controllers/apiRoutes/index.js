const router = require('express').Router();
const userRoutes = require('./userRoutes');
const googRoutes = require('./googleroutes')

router.use('/users', userRoutes);
router.use('/goog', googRoutes)

module.exports = router;