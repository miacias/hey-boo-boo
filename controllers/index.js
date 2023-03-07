const router = require('express').Router();
const htmlRoutes = require('./HTMLRoutes');
const apiRoutes = require('./apiRoutes');

router.use(htmlRoutes);
router.use(apiRoutes);

module.exports = router;