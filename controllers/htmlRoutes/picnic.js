const router = require('express').Router();
const htmlRoutes = require('./htmlRoutes');

router.get('/', async (req,res)=>{
    const jeff = 'jeff'
    res.render('createPicnic', {jeff})
})
module.exports = router