const router = require("express").Router();
const {
  User,
  Picnic,
  Food,
  PicnicUser,
} = require("../../models");
const withAuth = require('../../utils/auth.js');

// find all food & users attending one specific picnic
router.get("/:id", withAuth, async (req, res) => {
    //if there's food already at the picnic
  try {
    //Get all food & event info
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

    //variables for food & event info
    let eventName = data.picnicUsers[0].picnic.event_name;
    let address = data.picnicUsers[0].picnic.address;
    let startTime = data.picnicUsers[0].picnic.start_time;
    const foodsList = allFoods.map(({ name }) => name);

    //grab creator role number
    const creatorRole = data.picnicUsers[0].picnic.creator_role;

    //grab user info from creator role
    const creatorInfo = await User.findOne({
      where: { id: creatorRole },
    });

    //format host name
    const host = `${creatorInfo.dataValues.first_name} ${creatorInfo.dataValues.last_name}`;

    //get all people attending the picnic
    const allAttendees = await Picnic.findOne({
      where: { id: req.params.id },
      include: [{ model: User }]
    });

    // format names of all people attending
    let guests = await allAttendees.dataValues.users.map(({ first_name, last_name }) => `${first_name} ${last_name}`);


    //   res.send(allAttendees); //for insomnia testing

    res.render("picnicview", {
      loggedIn: req.session.logged_in,
      userId: req.session.user_id,
      firstName: req.session.first_name,
      lastName: req.session.last_name,
      allFoods,
      eventName,
      address,
      startTime,
      foodsList,
      host,
      guests
    });

  } catch (err) {
    //if it's a new picnic with no food yet
    try {
        const allInfo = await Picnic.findOne({
            where: {id: req.params.id},
            include: User
        });

        //variables for event info
        let eventName = allInfo.event_name;
        let address = allInfo.address;
        let startTime = allInfo.start_time;

        //get all people attending the picnic
        const allAttendees = await Picnic.findOne({
          where: { id: req.params.id },
          include: [{ model: User }]
        });

        // format names of all people attending
        let guests = await allInfo.dataValues.users.map(({ first_name, last_name }) => `${first_name} ${last_name}`);

        // //grab creator role number
        const creatorRole = allInfo.creator_role;

        // //grab user info from creator role
         const creatorInfo = await User.findOne({
            where: { id: creatorRole },
        });

        // //format host name
        const host = `${creatorInfo.dataValues.first_name} ${creatorInfo.dataValues.last_name}`;

        // res.send(allInfo); //for insomnia testing

        res.render("picnicview", {
          loggedIn: req.session.logged_in,
          userId: req.session.user_id,
          firstName: req.session.first_name,
          lastName: req.session.last_name,
          allInfo,
          eventName,
          address,
          startTime,
          guests,
          host
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
  }
}
);


module.exports = router;
