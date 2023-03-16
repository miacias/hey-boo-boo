const router = require('express').Router();
const htmlRoutes = require('./htmlRoutes');
const picnicRoutes = require('./picnicRoutes');


router.use('/', htmlRoutes);
router.use('/picnic', picnicRoutes);


module.exports = router;