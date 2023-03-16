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
router.post('/create', async (req, res) => {
    try {
        const newPicnic = await Picnic.create({
            event_name: /*req.body.event_name*/ "party",
            address: /*req.body.address*/ "123 hello st",
            // start_time: /*req.body.start_time*/,
            password: /*req.body.password*/ "password",
            creator_role: /*req.session.user_id*/ 2
        });
        // res.send(newPicnic)
        res.status(200).json(newPicnic);
        // console.log(newPicnic)
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;