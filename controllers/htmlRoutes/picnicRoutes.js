const router = require('express').Router();
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../../models');
const withAuth = require('../../utils/auth.js');

// find all users attending one picnic
// NEED TO MAKE A SECOND QUERY TO FIND USER DATA FOR CREATOR_ROLE
// need to add food-related stuff
router.get('/my-picnics/:picnic', withAuth, async (req, res) => {
    try {
        const allAttendees = await Picnic.findOne({
            where: { id: /*req.params.id*/ '1' },
            include: {
                model: User,
                through: PicnicUser,
            },
        });
        const creator = allAttendees.dataValues.creator_role;
        const host = await User.findOne({
            where: { id: creator }
        });
        console.log(host)
        console.log(allAttendees)
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});