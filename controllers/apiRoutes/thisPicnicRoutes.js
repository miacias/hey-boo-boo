const router = require('express').Router();
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../../models');


//user can add a food they want to bring to the picnic
router.post('/add-food', async (req, res) => {
    // console.log(req.body);
    try{
        const newFood = await Food.create({
            name: req.body.name
        });

        const addPU = await PicnicUser.create(
            {
                picnic_id: req.body.currentPicnicId,
                user_id: req.body.currentUser
            }
        );

        const addToFPU = await FoodPicnicUser.create(
            {
                food_id: newFood.id,
                picnic_user_id: addPU.id
            }
        );

        // await newFood.addPicnicUser(addPU, { through: { selfGranted: false } });

        // await addPU.addFood(addToFPU, { through: { selfGranted: false } });

        const comboOne = await FoodPicnicUser.findOne({
            where: { food_id: 21 },
            include: [Food, PicnicUser]
        });

        const comboTwo = await PicnicUser.findOne({
            where: { picnic_id: 1 },
            include: [User, Picnic]
        });

        // console.log(addToFPU);

        // res.render("picnicview", {
        //     loggedIn: req.session.logged_in,
        //     userId: req.session.user_id,
        //     firstName: req.session.first_name,
        //     lastName: req.session.last_name,
        //     // newFood
        // });

        res.send(comboOne, comboTwo); //for insomnia testing

    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});


module.exports = router;
