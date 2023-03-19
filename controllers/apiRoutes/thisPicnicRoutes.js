const router = require('express').Router();
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../../models');


//user can add a food they want to bring to the picnic
router.post('/add-food', async (req, res) => {
    // console.log(req.body);
    try{
        const newFood = await Food.create({
            // name: req.body.name
            name: "Grapes"
        });

        const addToFPU = await FoodPicnicUser.create(
            {
                // foodId: newFood.id,
                // picnicUserId: addPU.id
                foodId: 7,
                picnicUserId: 1
            }
        );

        // console.log(addToFPU);

        // res.render("picnicview", {
        //     loggedIn: req.session.logged_in,
        //     userId: req.session.user_id,
        //     firstName: req.session.first_name,
        //     lastName: req.session.last_name,
        //     // newFood
        // });

        res.send(newFood, addToFPU); //for insomnia testing

    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});


module.exports = router;
