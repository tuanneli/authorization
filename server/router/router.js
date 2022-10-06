const Router = require('express').Router;
const UseController = require('../controllers/user-controller');

const router = new Router();

router.post('/registration', UseController.registration);
router.post('/login', UseController.login);
router.post('/logout', UseController.logout);
router.get('/activate/:link', UseController.activate);
router.get('/refresh', UseController.refresh);
router.get('/users', UseController.users);

module.exports = router;