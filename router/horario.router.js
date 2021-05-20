// /API/HORARIO

const { Router } = require('express');
const { check }=require('express-validator') 
const { validar } =require('../middlewares/validarcampos.middleware');
const { validarJWT } = require('../middlewares/validar-jwt.middelware');
const { crearHorario, getHorariobyIdMedico, borrarHorario, actualizarHorario }= require('../controllers/horario.controllers')
const router=Router();

router.post('/',validarJWT,crearHorario);
router.get('/:id', validarJWT, getHorariobyIdMedico)
router.delete('/:id',validarJWT, borrarHorario)
router.put('/:id', validarJWT, actualizarHorario)
module.exports=router;