const router = require('express').Router();
<<<<<<< HEAD
// const htmlRoutes = require('./htmlRoutes');
const apiRoutes = require('./apiRoutes');

// router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

module.exports = router;
=======
const htmlRoutes = require('./htmlRoutes');
const apiRoutes = require('./apiRoutes');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

module.exports = router;
>>>>>>> 7ab39b1009eebfbb534ed7e04b3a4ec6a4b7d4ca
