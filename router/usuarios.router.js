
// Rutas: /api/usuarios

const { Router } = require('express');
const { getUsuarios,crearUsuario, actualizarUsuario,borrarUsuario}=require('../controllers/usuarios.controllers');
const { check }=require('express-validator') 
const { validar } =require('../middlewares/validarcampos.middleware');
const { validarJWT } = require('../middlewares/validar-jwt.middelware');
const { validarAdminRol, validarAdminRoloMismoUser } = require('../middlewares/validar-jwt.middelware');
const router=Router();

router.get('/',validarJWT, getUsuarios);

router.post('/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validar

    ],
    crearUsuario);

router.put('/:id',
    [
        validarJWT,
        validarAdminRoloMismoUser,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('rol','El rol es obligatorio').not().isEmpty(),
        validar
        

    ],
    actualizarUsuario);
    
router.delete('/:id',
    [   validarJWT,
        validarAdminRol
    ], 
    borrarUsuario);



module.exports=router;