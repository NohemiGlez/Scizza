var express = require('express');
var router = express.Router();
const authSocialController = require('../controllers/authSocialController');
const passport = require('passport');

// Auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// Callback route for google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send(req.user);
  res.redirect('/profile');
});

// Auth with facebook
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['public_profile']
}));

// Callback route for facebook
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  // res.send(req.user);
  res.redirect('/profile');
});

// Auth with Twitter

module.exports = router;
