const router = require("express").Router();
const {
  User,
  Picnic,
  Food,
  PicnicUser,
  FoodPicnicUser,
} = require("../../models");
// const withAuth = require('../../utils/auth.js');


// find all users attending one picnic
// need to add food-related stuff
router.get("/:id", /*withAuth,*/ async (req, res) => {
    try {
        const allFoods = await Food.findAll({
            attributes: {exclude: ["id"]},
            include: [
                {
                    model: PicnicUser, attributes: {exclude: ["picnicUserId"]},
                    where: {picnicId: req.params.id},
                    include: [
                        {
                            model: User
                        },
                        {
                            model: Picnic
                        },
                    ]
                }
            ]
        });


        // const allAttendees = await Picnic.findOne({
        //     where: {id: req.params.id},
        //     include: User
        // });

        // const creator = await allFoods.dataValues.picnicUsers.dataValues.picnic.creator_role;
        // const host = await User.findOne({
        //     where: {id: creator}
        // });

        // res.send({ allFoods }); //for insomnia testing

      res.render("picnicview", { allFoods });

    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
);

module.exports = router;
