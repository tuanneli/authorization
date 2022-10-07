const Router = require('express').Router;
const UseController = require('../controllers/user-controller');
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 33}),
    UseController.registration);
router.post('/login', UseController.login);
router.post('/logout', UseController.logout);
router.get('/activate/:link', UseController.activate);
router.get('/refresh', UseController.refresh);
router.get('/users', authMiddleware, UseController.getUsers);

module.exports = router;