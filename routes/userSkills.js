let express = require('express');
let router = express.Router();
const userSkillsController = require('../controllers/userSkillsController');

router.post('/', userSkillsController.create);

router.get('/get', userSkillsController.listAll);

router.get('/show/:id?', userSkillsController.listOne);

router.put('/edit/:id?', userSkillsController.update);

router.delete('/delete/:id?', userSkillsController.destroy);

module.exports = router;
