let express = require('express');
let router = express.Router();
const userStoryController = require('../controllers/userStoryController');

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

router.post('/', userStoryController.create);

router.get('/', authCheck, (req, res) => {
    res.render('userStories', { title: 'Scizza | Historias de usuario', username: req.user, principalSkill: 'Desarrollador Web' });
})

router.post('/add', userStoryController.createPendingRevision);

router.get('/get', userStoryController.listAll);

router.get('/show/:id?', userStoryController.listOne);

router.put('/edit/:id?', userStoryController.update);

router.delete('/delete/:id?', userStoryController.destroy);

module.exports = router;
