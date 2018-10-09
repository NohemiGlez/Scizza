let express = require('express');
let router = express.Router();
const membersController = require('../controllers/rolesController');

router.post('/', rolesController.create);

router.get('/:id?', rolesController.read);

router.put('/:id', rolesController.update);

router.delete('/:id', rolesController.destroy);

module.exports = router;
