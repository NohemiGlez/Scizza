let express = require('express');
let router = express.Router();
const projectsController = require('../controllers/projectsController');

router.post('/', projectsController.create);

//router.get('/', function (req, res, next) {
//    res.render('projects', { title: 'Scizza | Proyectos', username: 'Scizzonio Peperoni', principalSkill: 'Desarrollador Web' });
//});

router.get('/get', projectsController.listAll);

router.get('/show/:id?', projectsController.listOne);

router.put('/edit/:id?', projectsController.update);

router.delete('/delete/:id?', projectsController.destroy);

module.exports = router;
