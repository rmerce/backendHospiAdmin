const { Router } = require('express');
const { enviarMail }=require('../controllers/enviarmail.controllers');
const { validarJWT } = require('../middlewares/validar-jwt.middelware');
const router=Router();

router.post('/', [
    validarJWT
],
enviarMail);

module.exports=router;