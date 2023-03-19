const router = require("express").Router();
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require("../../models");
const withAuth = require('../../utils/auth.js');

// deletes food from picnic event
router.delete('/test/delete/:id', async (req, res) => {
  try {    
    const foodToUserData = await FoodPicnicUser.destroy({
      where: {
        food_id: req.body.foodId,
        picnicUserId: req.body.picnicUserId
      }
    });
    const foodData = await Food.destroy({
      where: {id: req.body.foodId}
    });
    res.status(200).json(foodData, foodToUserData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// edits food from picnic event
router.put('/test/edit/:id', async (req, res) => {
  try {
    
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
  const foodData = await Food.update({
    name: req.body.name,
    where: {id: req.body.food_id}
  });
  const foodToUserData = await FoodPicnicUser.update({
    name: req.body.name,
    where: {
      // food_id: req.body.food_id,
      picnic_id: req.body.picnic_id,
      user_id: req.body.user_id,
    }
  });
  res.status(200).json(foodData, foodToUserData);
});

// adds food to picnic event
router.post('/test/add/:id', async (req, res) => {
  try {
    const foodData = await Food.create({
      name: req.body.name,
    });
    const foodToUserData = await FoodPicnicUser.create({
      foodId: foodData.id,
      picnicUserId: req.body.picnicUserId,
    });
    res.status(200).json(foodData, foodToUserData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// renders users and foods for one picnic
router.get('/test/:id', async (req, res) => {
  try {
    // gets all invited users and the foods they will be bringing
    const thisPicnic = await FoodPicnicUser.findAll({
      attributes: ['id'],
      include: [
        { // identifies relationship between the picnic and attending users
          model: PicnicUser,
          attributes: ['id', 'user_id'],
          where: { picnicId: req.params.id },
          include:
            [
              { // accesses users invited to picnic
                model: User,
                attributes: ['id', 'first_name', 'last_name'],
              },
              { // accesses creator role ID
                model: Picnic,
                attributes: ['event_name', 'address', 'start_time', 'creator_role']
              }
            ]
        },
        { // accesses foods brought by each user
          model: Food
        },
      ]
    });

    // condenses returned values
    const picnicData = [];
    thisPicnic.map((user) => {
      const userData = {
        picnicUserId: user.picnicUser.id,
        userId: user.picnicUser.user.id,
        firstName: user.picnicUser.user.first_name,
        lastName: user.picnicUser.user.last_name,
        foodId: user.food.id,
        foodName: user.food.name
      };
      picnicData.push(userData);
    });

    // identifies user ID of event host
    const hostId = thisPicnic.flatMap((user) => {
      return user.picnicUser.picnic.creator_role;
    })[0];

    // gets all the food the host will be bringing
    const hostFood = await FoodPicnicUser.findOne({
      attributes: [],
      include: [
        { // identifies relationship between the picnic and host
          model: PicnicUser,
          attributes: [],
          where: { picnicId: req.params.id },
          include: [
            {
              model: User,
              where: { id: hostId }
            }
          ]
        },
        { // accesses foods brought by the host
          model: Food
        },
      ]
    });
    // converts data to plain text
    const hostAndFoods = hostFood.get({ plain: true });

    // gets picnic info
    const eventInfo = [];
    thisPicnic.map((event) => {
      const eventData = {
        picnicName: event.picnicUser.picnic.event_name,
        picnicAddy: event.picnicUser.picnic.address,
        picnicTime: event.picnicUser.picnic.start_time,
      }
      eventInfo.push(eventData);
    });
    console.log(eventInfo)

    // sends data to Insomnia for testing
    res.send(eventInfo);
    // res.send(hostFood);

    // sends data to front-end page
    // res.render('test', {
    //   picnicData,
    //   hostAndFoods,
    //   eventInfo,
    //   loggedIn: req.session.logged_in,
    //   userId: req.session.user_id,
    //   firstName: req.session.first_name,
    //   lastName: req.session.last_name
    // });
  } catch (err) {
    // console.error(err);
    // res.status(500).json(err);
    //if it's a new picnic with no food yet
    try {
      const allInfo = await Picnic.findOne({
        where: { id: req.params.id },
        include: User
      });

      //variables for event info
      let eventName = allInfo.event_name;
      let address = allInfo.address;
      let startTime = allInfo.start_time;

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
        allInfo,
        eventName,
        address,
        startTime,
        host
      });

    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
});








// // find all food & users attending one specific picnic
// router.get("/:id", withAuth, async (req, res) => {
//   //if there's food already at the picnic
//   try {
//     //Get all food & event info
//     const allFoods = await Food.findAll({
//       attributes: { exclude: ["id"] },
//       include: [
//         {
//           model: PicnicUser,
//           attributes: { exclude: ["picnicUserId"] },
//           where: { picnicId: req.params.id },
//           include: [
//             {
//               model: User,
//             },
//             {
//               model: Picnic,
//             },
//           ],
//         },
//       ],
//     });

//     let [data] = allFoods;

//     //variables for food & event info
//     let eventName = data.picnicUsers[0].picnic.event_name;
//     let address = data.picnicUsers[0].picnic.address;
//     let startTime = data.picnicUsers[0].picnic.start_time;
//     let foodsList = allFoods.map(({ name }) => name);

//     //grab creator role number
//     const creatorRole = data.picnicUsers[0].picnic.creator_role;

//     //grab user info from creator role
//     const creatorInfo = await User.findOne({
//       where: { id: creatorRole },
//     });

//     //format host name
//     const host = `${creatorInfo.dataValues.first_name} ${creatorInfo.dataValues.last_name}`;

//     //get all people attending the picnic
//     const allAttendees = await Picnic.findOne({
//       where: { id: req.params.id },
//       include: [{ model: User }]
//     });

//     // format names of all people attending
//     let guests = await allAttendees.dataValues.users.map(({ first_name, last_name }) => `${first_name} ${last_name}`);


//     //   res.send(allAttendees); //for insomnia testing

//     res.render("picnicview", {
//       allFoods,
//       eventName,
//       address,
//       startTime,
//       foodsList,
//       host,
//       guests
//     });

//   } catch (err) {
//     //if it's a new picnic with no food yet
//     try {
//       const allInfo = await Picnic.findOne({
//         where: { id: req.params.id },
//         include: User
//       });

//       //variables for event info
//       let eventName = allInfo.event_name;
//       let address = allInfo.address;
//       let startTime = allInfo.start_time;

//       // //grab creator role number
//       const creatorRole = allInfo.creator_role;

//       // //grab user info from creator role
//       const creatorInfo = await User.findOne({
//         where: { id: creatorRole },
//       });

//       // //format host name
//       const host = `${creatorInfo.dataValues.first_name} ${creatorInfo.dataValues.last_name}`;

//       // res.send(allInfo); //for insomnia testing

//       res.render("picnicview", {
//         allInfo,
//         eventName,
//         address,
//         startTime,
//         host
//       });

//     } catch (err) {
//       console.error(err);
//       res.status(500).json(err);
//     }
//   }
// }
// );


module.exports = router;