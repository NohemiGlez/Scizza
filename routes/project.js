var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('project', { title: 'Scizza | Proyecto', username: 'Scizzonio Peperoni', principalSkill: 'Desarrollador Web' });
});

module.exports = router;
