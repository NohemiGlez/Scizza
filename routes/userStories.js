let express = require('express');
let router = express.Router();
const userStoryController = require('../controllers/userStoryController');

router.post('/', userStoryController.create);

router.get('/get', userStoryController.listAll);

router.get('/show/:id?', userStoryController.listOne);

router.put('/edit/:id?', userStoryController.update);

router.delete('/delete/:id?', userStoryController.destroy);

module.exports = router;
