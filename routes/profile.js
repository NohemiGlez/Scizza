var express = require('express');
var router = express.Router();

// Comprobar si el usuario esta logeado
const authCheck = (req, res, next) => {
  if(!req.user) {
    res.redirect('/');
  } else {
    next();
  }
};

/* GET users listing. */
router.get('/', authCheck, (req, res) => {
  res.render('profile', { title: 'Scizza | Perfil de usuario', username: req.user , principalSkill: 'Desarrollador Web' });
})

module.exports = router;
