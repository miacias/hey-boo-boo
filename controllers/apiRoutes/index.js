const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const newPicnicRoutes = require('./newPicnicRoutes.js');
const thisPicnicRoutes = require('./thisPicnicRoutes');
const googRoutes = require('./googleroutes.js');

router.use('/users', userRoutes);
router.use('/new-picnic', newPicnicRoutes);
router.use('/edit-picnic', thisPicnicRoutes);
router.use('/goog', googRoutes);

module.exports = router;