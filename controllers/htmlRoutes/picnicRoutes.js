const router = require("express").Router();
const {
  User,
  Picnic,
  Food,
  PicnicUser,
  //   FoodPicnicUser,
} = require("../../models");
// const withAuth = require('../../utils/auth.js');


// find all food & users attending one specific picnic
router.get("/:id",/*withAuth,*/ async (req, res) => {
    try {
      const allFoods = await Food.findAll({
        attributes: { exclude: ["id"] },
        include: [
          {
            model: PicnicUser,
            attributes: { exclude: ["picnicUserId"] },
            where: { picnicId: req.params.id },
            include: [
              {
                model: User,
              },
              {
                model: Picnic,
              },
            ],
          },
        ],
      });

      let [data] = allFoods;

      let eventName = data.picnicUsers[0].picnic.event_name;
      let address = data.picnicUsers[0].picnic.address;
      let startTime = data.picnicUsers[0].picnic.start_time;
      let foodsList = allFoods.map(({ name }) => name);

      const creatorRole = data.picnicUsers[0].picnic.creator_role;

        const creatorInfo = await User.findOne({
            where: { id: creatorRole },
        });

        const host = `${creatorInfo.dataValues.first_name} ${creatorInfo.dataValues.last_name}`;


      const allAttendees = await Picnic.findOne({
        where: { id: req.params.id },
        include: [{model: User}]
      });

      let guests = await allAttendees.dataValues.users.map(({first_name,last_name}) => `${first_name} ${last_name}`);


    //   console.log(host);
    //   res.send(allAttendees); //for insomnia testing

        res.render("picnicview", {
            
        });

    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
);


module.exports = router;



//   let foodBringers = allFoods[0].picnicUsers.map(({ user: { first_name, last_name } }) => `${first_name} ${last_name}`);
// let usersNames = data.picnicUsers.map(({first_name,last_name}), `${first_name} ${last_name}`)


// let host = creatorName.filter(({host: {first_name,last_name} }) => `${first_name} ${last_name}`);