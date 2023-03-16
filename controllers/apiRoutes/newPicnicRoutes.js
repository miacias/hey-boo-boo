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
        const getPassword = await Picnic.findOne({
            where: {
                id: req.body.id
            }
        });
        // verify picnic password is correct
        const pass = await getPassword.checkPassword(req.body.password);
        if (!pass) {
            res.status(404).json({message: 'Incorrect password. Please try again.'});
            return;
        };
        // create new PicnicUser
        const newAttendee = await PicnicUser.create({
            picnicId: req.body.id,
            userId: req.session.user_id
        });
        console.log(newAttendee)
        // all checks pass: add attendee to PicnicUser (i.e. event)
        res.status(201).json(newAttendee);
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
        console.log(newPicnic)
        // res.send(newPicnic) // for testing via Insomnia
        res.status(200).json(newPicnic);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;