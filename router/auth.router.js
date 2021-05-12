//RUTA: 'api/login'

const { Router } = require('express');
const { login,googleLogin, renovarToken }=require('../controllers/auth.controllers');
const { check }=require('express-validator') 
const { validar } =require('../middlewares/validarcampos.middleware')
const { validarJWT }=require('../middlewares/validar-jwt.middelware')
const router=Router();

router.post('/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validar
    ],login);

router.post('/google',
    [
      
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validar
    ],googleLogin);
router.get('/renovartoken',validarJWT, renovarToken)


module.exports=router;