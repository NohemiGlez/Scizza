let express = require('express');
let router = express.Router();
const developerTeamsController = require('../controllers/developerTeamsController');
/*
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};
*/
router.post('/', developerTeamsController.create);
/*
router.get('/', authCheck, (req, res) => {
    res.render('developerTeams/listAll', { title: 'Scizza | Habilidades de usuario', username: req.user, principalSkill: 'Desarrollador Web' });
});
*/
router.get('/get', developerTeamsController.listAll);

router.get('/show/:id?', developerTeamsController.listOne);

router.put('/edit/:id?', developerTeamsController.update);

router.delete('/delete/:id?', developerTeamsController.destroy);

module.exports = router;
