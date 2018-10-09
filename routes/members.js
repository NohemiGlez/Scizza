let express = require('express');
let router = express.Router();
const membersController = require('../controllers/membersController');

router.post('/', membersController.create);

router.get('/:id?', membersController.read);

router.put('/:id', membersController.update);

router.delete('/:id', membersController.destroy);

module.exports = router;