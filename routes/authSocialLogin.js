var express = require('express');
var router = express.Router();
const authSocialController = require('../controllers/authSocialController');
const passport = require('passport');

const passportSetup = require('../config/passportSetup');

// Auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// Callback route for google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send(req.user);
  if(passportSetup.usuarioExistente) {
    res.redirect('/projects/get');
  } else {
    res.redirect('/profile');
  }

});

// Auth with linkedin
router.get('/linkedin', passport.authenticate('linkedin', {
  scope: ['r_emailaddress', 'r_basicprofile']
}));

// Callback route for facebook
router.get('/linkedin/redirect', passport.authenticate('linkedin'), (req, res) => {
  // res.send(req.user);
  res.redirect('/profile');
});

// Auth with github
router.get('/github', passport.authenticate('github', {
  scope: ['user']
}));

// Callback route for facebook
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  // res.send(req.user);
  res.redirect('/profile');
});

module.exports = router;
