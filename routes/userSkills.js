let express = require('express');
let router = express.Router();
const userSkillsController = require('../controllers/userSkillsController');

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

router.post('/', userSkillsController.create);

router.get('/', authCheck, (req, res) => {
    res.render('userSkills', { title: 'Scizza | Habilidades de usuario', username: req.user, principalSkill: 'Desarrollador Web' });
})

router.get('/get', userSkillsController.listAll);

router.get('/show/:id?', userSkillsController.listOne);

router.put('/edit/:id?', userSkillsController.update);

router.delete('/delete/:id?', userSkillsController.destroy);

module.exports = router;
