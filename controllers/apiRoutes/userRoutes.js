const router = require('express').Router();
const { UserRefreshClient } = require('google-auth-library');
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../../models');

// parent route is /api/users

router.get('/login', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// handles sign up for new users
router.post('/signup', async (req, res) => {
  try {
    // collects user data
    const userData = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    // saves user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


// handles log in for returning users
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again.' });
      return;
    }
    // verifies user password
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again.' });
      return;
    }
    // saves user session
    req.session.save(() => {
      req.session.user_id = userData.dataValues.id;
      req.session.logged_in = true;
      req.session.first_name = userData.dataValues.first_name;
      req.session.last_name = userData.dataValues.last_name;
      res.json({ user: userData, message: 'You have logged in successfully.' });

    });
  } catch (err) {
    res.status(400).json(err);
  }
});


// handles log out for exiting users
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      return res.redirect('/');
    });
  } else {
    res.status(400).end();
  }
});

module.exports = router;