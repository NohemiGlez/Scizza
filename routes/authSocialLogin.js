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
  res.send('Callback URI alcanzado');
});

// Auth with facebook

// Auth with Twitter

module.exports = router;
