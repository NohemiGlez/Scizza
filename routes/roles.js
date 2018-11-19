let express = require('express');
let router = express.Router();
const rolesController = require('../controllers/rolesController');

router.post('/', rolesController.create);

router.get('/get', rolesController.listAll);

router.get('/show/:id?', rolesController.listOne);

router.put('/edit/:id?', rolesController.update);

router.delete('/delete/:id?', rolesController.destroy);

module.exports = router;
