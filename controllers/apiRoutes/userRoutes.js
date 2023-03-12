const router = require('express').Router();
const { User, /* Picnic, Food*/ } = require('../../models');

// handles sign up for new users
router.post('/signup', async (req, res) => {
  try {
    // collects user data
    const userData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
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
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.first_name = userData.first_name;
      req.session.last_name = userData.last_name;
      res.json({ user: userData, message: 'You have logged in successfully.' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// handles log out for exiting users
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;