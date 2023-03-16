const router = require('express').Router();
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../../models');
const withAuth = require('../../utils/auth.js');


// render logged in home page
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

// renders login page for user to sign up or log in
router.get('/login', (req, res) => {
    // sends to home page if already connected
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    };
    res.render('login');
});

// renders all picnics one user is attending
router.get('/my-picnics', /* withAuth,*/  async (req, res) => {
    console.log('GET: my-picnics', req.session.user_id, req.session.logged_in);
    try {
        // finds all picnics for one user
        const myPicnics = await Picnic.findAll({
            include: {
                model: User,
                through: PicnicUser,
            },
            where: {
                id: /* req.session.user_id */  3
            },
            order: [['start_time', 'DESC']],
        });
        if (!myPicnics) {
            res.status(404).json({ message: 'No picnics available' });
            return;
        }
        const picnics = myPicnics.map((picnic) => {
            return picnic.get({ plain: true });
        });
        console.log(picnics)
        res.render('myPicnics', {
            picnics,
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

// renders new-picnic page to allow user to create or join an event
router.get('/new-picnic', async (req, res) => {
    console.log("GET: new-picnic", req.session.user_id, req.session.logged_in);
    try {
        res.render('newPicnic', {
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