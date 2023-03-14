const router = require('express').Router();
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../../models');
const withAuth = require('../../utils/auth.js');

// renders all picnics one user is attending
router.get('/my-picnics', withAuth, async (req, res) => {
    console.log('GET: my-picnics', req.session.user_id, req.session.logged_in);
    try {
        // query will need to be refactored after new seeds are added
        const myPicnics = await Picnic.findAll({
            // attributes: ['id', 'event_name', 'address', 'start_time', 'creator_role', 'created_at'],
            include: {
                model: User,
                as: 'events',
                through: Food
                // attributes: ['id', 'first_name', 'last_name']
            },
            // where: { userId: req.session.user_id },
            order: [['start_time', 'DESC']],
        });
        if (!myPicnics) {
            res.status(404).json({ message: 'No picnics available' });
            return;
        }
        const home = myPicnics.map((picnic) => {
            return picnic.get({ plain: true });
        });
        console.log(home)
        res.render('home', {
            home,
            loggedIn: req.session.logged_in,
            userId: req.session.user_id,
            firstName: req.session.first_name,
            lastName: req.session.last_name
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// renders login page for user to sign up or log in
router.get('/login', (req, res) => {
    // sends to home page if already connected
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    };
    res.render('login');
});

// get logged in home page
router.get('/', async (req, res) => {
    console.log("GET: home", req.session.user_id, req.session.logged_in);
    try {
        res.render('home', {
            loggedIn: req.session.logged_in,
            userId: req.session.user_id,
            firstName: req.session.first_name,
            lastName: req.session.last_name
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;