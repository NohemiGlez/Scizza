let express = require('express');
let router = express.Router();
const cardsController = require('../controllers/cardsController');

router.post('/', cardsController.create);

router.get('/get', cardsController.listAll);

router.get('/show/:id?', cardsController.listOne);

router.put('/edit/:id?', cardsController.update);

router.delete('/delete/:id?', cardsController.destroy);

module.exports = router;
