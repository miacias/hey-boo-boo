const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const newPicnicRoutes = require('./newPicnicRoutes.js')
const googRoutes = require('./googleroutes.js');

router.use('/users', userRoutes);
router.use('/new-picnic', newPicnicRoutes);
router.use('/goog', googRoutes);

module.exports = router;