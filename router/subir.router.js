//API/SUBIR/:TABLA/:BUSQUEDA

const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { check }=require('express-validator') 
const { validar } =require('../middlewares/validarcampos.middleware')
const { validarJWT } = require('../middlewares/validar-jwt.middelware');
const { cargarArchivo,retornarImagen } = require('../controllers/subir.controllers')
const router=Router();
router.use(fileUpload());

router.put('/:tipo/:id',
    [
        validarJWT
    ],
    cargarArchivo)
router.get('/:tipo/:foto',retornarImagen)



module.exports=router