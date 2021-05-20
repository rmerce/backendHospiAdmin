const { Router } = require('express');
const { guardarEnvio, getEnvio}=require('../controllers/enviomasivo.controllers');
const { check }=require('express-validator') 
const { validar } =require('../middlewares/validarcampos.middleware');
const { validarJWT } = require('../middlewares/validar-jwt.middelware');
const { validarAdminRol, validarAdminRoloMismoUser } = require('../middlewares/validar-jwt.middelware');
const router=Router();

router.post('/',[validarJWT], guardarEnvio);

router.get('/',[validarJWT],getEnvio)

module.exports=router;