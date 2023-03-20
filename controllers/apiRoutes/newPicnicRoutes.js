const router = require('express').Router();
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../../models');

/*
When sending values to Sequelize, use camel case...
...UNLESS setting foreign keys manually, then use that name.
Sequelize changes values to snake case.
*/

// assigns existing user (session) to an existing picnic
router.post('/join', async (req, res) => {
    try {
        // find picnic password
        const iAmInvited = await Picnic.findOne({
            where: {
                id: req.body.id
            }
        });
        // verify picnic password is correct
        const pass = iAmInvited.checkPassword(req.body.password);
        if (!pass) {
            res.status(404).json({message: 'Incorrect password. Please try again.'});
            return;
        };
        // create new PicnicUser
        const newAttendee = await PicnicUser.create({
            picnicId: req.body.id,
            userId: req.session.user_id
        });
        // all checks pass: add attendee to PicnicUser (i.e. event)
        res.status(201).json(newAttendee);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// acts like a POST, needs to be GET for user to access html view
// assigns existing user (session) to an existing picnic via join link (text message/social media link)

/*

plans for refactoring!
instead of join link automatically adding a user to an event, do the following steps:

- create a new HTML view and route to /join/:id
- HTML view says "welcome to {{event_name}}, please enter the password you received from {{creator name person}} to join!"
- after entering correct password, redirect to /my-picnics/:id

*/
router.get('/join/:id', async (req, res) => {
    try {
        // create new PicnicUser
        await PicnicUser.create({
            picnicId: req.params.id,
            userId: req.session.user_id
        });
        // res.status(201).json(newAttendee);
        res.status(301).redirect('/my-picnics');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// creates a new picnic and assigns session user as creator
router.post('/create', async (req, res) => {
    try {
        const newPicnic = await Picnic.create({
            event_name: req.body.event_name,
            address: req.body.address,
            start_time: req.body.start_time,
            password: req.body.password,
            creator_role: req.session.user_id
        });
        const newPicnicUser = await PicnicUser.create({
            userId: req.session.user_id,
            picnicId: newPicnic.id
        })
        console.log(newPicnicUser)
        res.status(200).json(newPicnic);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;