var express = require('express');
var router = express.Router();
const authSocialController = require('../controllers/authSocialController');

// Auth with google
router.get('/google', authSocialController.get);

// Auth with facebook

// Auth with Twitter

module.exports = router;
