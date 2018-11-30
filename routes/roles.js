let express = require('express');
let router = express.Router();
const rolesController = require('../controllers/rolesController');

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

router.post('/', rolesController.create);

router.get('/', authCheck, (req, res) => {
    res.render('roles/get', { title: 'Scizza | Roles de usuario', username: req.user, principalSkill: 'Desarrollador Web' });
});

router.get('/get', rolesController.listAll);

router.get('/show/:id?', rolesController.listOne);

router.put('/edit/:id?', rolesController.update);

router.delete('/delete/:id?', rolesController.destroy);

module.exports = router;
