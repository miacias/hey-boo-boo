const router = require('express').Router();
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../../models');
const withAuth = require('../../utils/auth.js');


// render logged in home page
router.get('/', async (req, res) => {
    console.log("GET: home", req.session.user_id, req.session.logged_in);
    try {
        return res.render('home', {
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
        
        console.log(attendingArr)
        console.log('\n-----------------')
        console.log(hosting)
        console.log('\n-----------------')
        //  use the filter method to find all instances where Hosting and Attending arrays would display the same 
        // event twice on the page. search through the hosting array with .some() if the two objects have the same id
        // property some returns false, so we use the '!' to include that object in the new attending array
        const attending =attendingArr.filter( (attendingID) => !hosting.some((host)=> host.id===attendingID.id ))
        console.log(attending)
        // below code is garbage( only works if hosting one event)
        // for (let i = 0 ; i< attendingArr.length; i++){
        //    if (attendingArr[i].id !== hosting[0].id)
        // attending.push(attendingArr[i])
        // }
        // console.log(attending, hosting)
        return res.render('myPicnics', {
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
        return res.render('newPicnic', {
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

module.exports = router;