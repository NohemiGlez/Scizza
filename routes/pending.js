var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('pending', { title: 'Scizza | Perfil de usuario', username: 'Scizzonio Peperoni', principalSkill: 'Desarrollador Web' });
});

module.exports = router;
