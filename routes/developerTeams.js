let express = require('express');
let router = express.Router();
const developerTeamsController = require('../controllers/developerTeamsController');

router.post('/', developerTeamsController.create);

router.get('/get', developerTeamsController.listAll);

router.get('/show/:id?', developerTeamsController.listOne);

router.put('/edit/:id?', developerTeamsController.update);

router.delete('/delete/:id?', developerTeamsController.destroy);

module.exports = router;
