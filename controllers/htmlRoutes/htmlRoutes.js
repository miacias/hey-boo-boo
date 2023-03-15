const router = require('express').Router();
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../../models');
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

// JOIN PICNIC: assigns existing user (session) to an existing picnic
router.post('/new-picnic', async (req, res) => {
    try {
        // when inserting values to Sequelize, need to use camel case UNLESS setting foreign keys manually, then use that name
        // Sequelize changes values to snake case
        const newAttendee = await PicnicUser.create({
            picnicId: /*req.body.address*/ 1, 
            userId: /*req.body.address*/ 3
        });
        console.log(newAttendee)
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// creates a new picnic and assigns session user as creator
router.post('/new-picnic', async (req, res) => {
    try {
        const newPicnic = await Picnic.create({
            event_name: /*req.body.event_name*/ "party",
            address: /*req.body.address*/ "123 hello st",
            // start_time: /*req.body.start_time*/,
            password: /*req.body.password*/ "password",
            creator_role: /*req.session.user_id*/ 2
        });
        console.log(newPicnic)
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// renders all picnics one user is attending
router.get('/my-picnics', withAuth, async (req, res) => {
    console.log('GET: my-picnics', req.session.user_id, req.session.logged_in);
    try {
        // finds all picnics for one user
        const myPicnics = await Picnic.findAll({
            include: {
                model: User,
                through: PicnicUser,
            },
            where: {
                id: /*req.session.user_id*/ 4
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


// renders new-picnic page to allow user to create or join an event
router.get('/new-picnic', async (req, res) => {
    console.log("GET: home", req.session.user_id, req.session.logged_in);
    try {
        const allMyPicnics = await User.findAll({
            // attributes: ['id', 'event_name', 'address', 'start_time', 'creator_role', 'created_at'],
            include: {
                model: Picnic,
                through: PicnicUser
                // attributes: ['id', 'first_name', 'last_name']
            },
            // where: { userId: req.session.user_id },
            // order: [['start_time', 'DESC']],
        });
        if (!allMyPicnics) {
            res.status(404).json({ message: 'No picnics available' });
            return;
        }
        const home = allMyPicnics.map((picnic) => {
            return picnic.get({ plain: true });
        });
        res.render('newpicnic', {
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

// find all users attending one picnic
// NEED TO MAKE A SECOND QUERY TO FIND USER DATA FOR CREATOR_ROLE
// need to add food-related stuff
router.get('/:picnic', async (req, res) => {
    try {
        const allAttendees = await Picnic.findOne({
            where: {id: /*req.params.id*/ '1'},
            include: {
                model: User,
                through: PicnicUser,
            },
        });
        const creator = allAttendees.dataValues.creator_role;
        const host = await User.findOne({
            where: {id: creator}
        })
        console.log(host)
        console.log(allAttendees)
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;