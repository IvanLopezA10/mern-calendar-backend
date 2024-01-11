/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { revalidateToken, createUser, loginUser } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();



router.post(
    '/register', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 5 caracteres').isLength({ min: 5 }),
        validarCampos
    ],
    createUser 
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 5 caracteres').isLength({ min: 5 }),
        validarCampos
    ],
    loginUser
);


router.get('/renew', validarJWT ,revalidateToken );




module.exports = router;