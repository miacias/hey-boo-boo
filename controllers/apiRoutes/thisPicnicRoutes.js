const router = require('express').Router();
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../../models');


// lets user add food to picnic event
router.post('/add-food', async (req, res) => {
    try {
      const foodData = await Food.create({
        name: req.body.name,
      });
      const foodToUserData = await FoodPicnicUser.create({
        foodId: foodData.id,
        picnicUserId: req.body.picnicUserId,
      });
      // collects created data to one object
      const allData = {
        newFood: foodData,
        newFPU: foodToUserData
      }
      res.status(200).json(allData);
      // res.send(foodToUserData); //for insomnia testing
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
});


module.exports = router;
