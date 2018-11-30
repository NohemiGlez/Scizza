let express = require('express');
let router = express.Router();
const sprintsController = require('../controllers/sprintsController');

router.get('/:id', sprintsController.sprints);

router.post('/', sprintsController.create);

router.get('/get', sprintsController.listAll);

router.get('/show/:id?', sprintsController.listOne);

router.put('/edit/:id?', sprintsController.update);

router.delete('/delete/:id?', sprintsController.destroy);

module.exports = router;
