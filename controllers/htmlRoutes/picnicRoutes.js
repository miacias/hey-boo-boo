const router = require('express').Router();
const { User, Picnic, Food , PicnicUser, FoodPicnicUser} = require('../../models');
// const withAuth = require('../../utils/auth.js');


// //view specific picnic by id
// router.get('/:id', withAuth, async (req, res) => {
//     try {
//         const searchedPicnic = await Picnic.findOne({
//          where: {
//           id: req.params.id
//          },
//           include: [User, Food]
//        });
//        if (!searchedPicnic) {
//         return res.status(404).json({
//           "message": "No picnic with that id was found."
//         });
//        }
//        return res.json(searchData);
//     } catch(err) {
//         return res.status(500).json(err);
//     }
// });


// find all users attending one picnic
// NEED TO MAKE A SECOND QUERY TO FIND USER DATA FOR CREATOR_ROLE
// need to add food-related stuff
router.get('/:id', /*withAuth,*/ async (req, res) => {
    console.log(req.params.id);
    try {
        const allAttendees = await Picnic.findOne({
            where: {id: req.params.id},
            include: {
                model: User,
                through: PicnicUser,
            },
        });
        const creator = await allAttendees.dataValues.creator_role;
        const host = await User.findOne({
            where: {id: creator}
        });
        // console.log(host)
        // console.log(allAttendees)
        // res.send({allAttendees, host}); //for insomnia testing
        res.render("picnicview", {allAttendees, host});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


module.exports = router;