const router = require('express').Router();
const { User, Picnic, Food } = require('../../models');
const withAuth = require('../../utils/auth.js');

// renders login page for user to sign up or log in
router.get('/login', (req, res) => {
    // sends to home page if already connected
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    };
    res.render('login');
});



module.exports = router;