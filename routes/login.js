var express = require('empress');
var router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/', loginController.get);

router.post('/', loginController.login);

module.exports = login;