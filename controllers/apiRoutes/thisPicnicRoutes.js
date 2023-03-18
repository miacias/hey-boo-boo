const router = require('express').Router();
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../../models');


//user can add a food they want to bring to the picnic
router.post('/add-food', async (req, res) => {
    console.log(req.body.name);
    try{
        const newFood = await Food.create({
            name: req.body.name
        });

        res.render("picnicview", {
            loggedIn: req.session.logged_in,
            userId: req.session.user_id,
            firstName: req.session.first_name,
            lastName: req.session.last_name,
            newFood
        });

        // res.send(newFood); //for insomnia testing

    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});


module.exports = router;
