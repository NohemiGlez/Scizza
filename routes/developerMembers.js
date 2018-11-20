let express = require('express');
let router = express.Router();
const developerMembersController = require('../controllers/developerMembersController');

router.post('/', developerMembersController.create);

router.get('/get', developerMembersController.listAll);

router.get('/show/:id?', developerMembersController.listOne);

router.put('/edit/:id?', developerMembersController.update);

router.delete('/delete/:id?', developerMembersController.destroy);

module.exports = router;
