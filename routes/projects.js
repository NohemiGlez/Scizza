let express = require('express');
let router = express.Router();
const projectsController = require('../controllers/projectsController');

router.post('/', projectsController.create);

router.get('/:id?', projectsController.read);

router.put('/:id', projectsController.update);

router.delete('/:id', projectsController.destroy);

module.exports = router;
