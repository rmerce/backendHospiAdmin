//API/TODO/:BUSQUEDA

const { Router } = require('express');
const { check }=require('express-validator') 
const { validar } =require('../middlewares/validarcampos.middleware')
const { getBusquedasTotales, getBusquedaColeccion}=require('../controllers/busquedas.controller');
const { validarJWT } = require('../middlewares/validar-jwt.middelware');
const router=Router();

router.get('/:busqueda',
    [
        validarJWT
    ],
getBusquedasTotales)

router.get('/coleccion/:tabla/:busqueda',[
    validarJWT
],
getBusquedaColeccion
)



module.exports=router