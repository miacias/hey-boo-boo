const router = require('express').Router();
const { User, Picnic, Food } = require('../../models');
const withAuth = require('../../utils/auth.js');


//view specific picnic by id
router.get('/:id', withAuth, async (req, res) => {
    try {
        const searchedPicnic = await Picnic.findOne({
         where: {
          id: req.params.id
         },
          include: [User, Food]
       });
       if (!searchedPicnic) {
        return res.status(404).json({
          "message": "No picnic with that id was found."
        });
       }
       return res.json(searchData);
    } catch(err) {
        return res.status(500).json(err);
    }
});
