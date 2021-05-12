// /API/HOSPITALES

const { Router } = require('express');
const { check }=require('express-validator') 
const { validar } =require('../middlewares/validarcampos.middleware');
const { validarJWT } = require('../middlewares/validar-jwt.middelware');
const { getHospitales,crearHospital, actualizarHospital,borrarHospital}=require('../controllers/hospitales.controllers');


const router=Router();

router.get('/', getHospitales);

router.post('/',
    [ validarJWT,
      check('nombre','El nombre del hospital es necesario').not().isEmpty(),
      validar ],
    crearHospital);

router.put('/:id',
    [
      validarJWT,
      check('nombre','El nombre del hospital es necesario').not().isEmpty(),
      validar

    ],
    actualizarHospital);
    
router.delete('/:id', validarJWT, borrarHospital);



module.exports=router;