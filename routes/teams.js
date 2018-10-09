let express = require('express');
let router = express.Router();
const teamsController = require('../controllers/teamsController');

router.post('/', teamsController.create);

router.get('/:id?', teamsController.read);

router.get('/', teamsController.readAll);

router.put('/:id', teamsController.update);

router.delete('/:id', teamsController.destroy);

module.exports = router;
