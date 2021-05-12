// /API/MEDICOS

const { Router } = require('express');
const { check }=require('express-validator') 
const { validar } =require('../middlewares/validarcampos.middleware');
const { validarJWT } = require('../middlewares/validar-jwt.middelware');
const { getMedicos,crearMedico, actualizarMedico,borrarMedico, get1Medico}=require('../controllers/medicos.controllers');


const router=Router();

router.get('/', validarJWT, getMedicos);

router.post('/',
    [ validarJWT,
      check('nombre','El nombre del médico es necesario').not().isEmpty(),
      check('hospital','El hospital id tiene que ser válido').isMongoId(),
      validar
    ],
    crearMedico);

router.put('/:id',
    [
      validarJWT,
      check('nombre','El nombre del médico es necesario').not().isEmpty(),
      check('hospital','El hospital id tiene que ser válido').isMongoId(),
      validar
    ],
    actualizarMedico);
    
router.delete('/:id', validarJWT, borrarMedico);

router.get('/:id',validarJWT,get1Medico)

module.exports=router;