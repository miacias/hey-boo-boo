const router = require('express').Router();
const htmlRoutes = require('./htmlRoutes');
const picnicRoutes = require('./picnicRoutes');


router.use('/', htmlRoutes);
router.use('/my-picnics', picnicRoutes);


module.exports = router;