const router = require('express').Router();
const { User, Picnic, Food } = require('../../models');
const withAuth = require('../../utils/auth.js');

// renders login page for user to sign up or log in
router.get('/login', (req, res) => {
    // sends to home page if already connected
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    };
    res.render('login');
});

// get logged in home page with all picnics for user
router.get('/', withAuth, async (req, res) => {
    console.log("GET: logged in home", req.session.user_id, req.session.logged_in);
    try {
        const allMyPicnics = await Picnic.findAll({
            attributes: ['id', ],
            where: { userId: req.session.user_id },
            order: [['start_time', 'DESC']],
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;