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

// renders all picnics one user is hosting and attending
router.get('/my-picnics', withAuth, async (req, res) => {
    console.log('GET: my-picnics', req.session.user_id, req.session.logged_in);
    try {
        // finds all picnics user is attending
        const iAmInvited = await Picnic.findAll({
            include: {
                model: PicnicUser,
                where: {
                    user_id: req.session.user_id
                }
            }
        });
        // finds all picnics user is hosting
        const iAmHosting = await Picnic.findAll({
            include: {
                model: User,
                through: PicnicUser,
            },
            where: {
                creator_role: req.session.user_id
            },
            order: [['start_time', 'DESC']]
        });
        if (!iAmInvited && !iAmHosting) {
            res.status(404).json({ message: 'No picnics available' });
            return;
        }
        const attendingArr = iAmInvited.map((picnic) => {
            return picnic.get({ plain: true });
        });
        const hosting = iAmHosting.map((picnic) => {
            return picnic.get({ plain: true });
        });

        const attending =[] 
        for (let i = 0 ; i< attendingArr.length; i++){
           // console.log(attendingArr[i].id)
           // console.log(hosting[0].id)
           if (attendingArr[i].id !== hosting[0].id)
        attending.push(attendingArr[i])
        }
        // console.log(attending, hosting)
        res.render('myPicnics', {
            attending,
            hosting,
            loggedIn: req.session.logged_in,
            userId: req.session.user_id,
            firstName: req.session.first_name,
            lastName: req.session.last_name,
            url: req.url
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// renders new-picnic page to allow user to create or join an event
router.get('/new-picnic', withAuth, async (req, res) => {
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