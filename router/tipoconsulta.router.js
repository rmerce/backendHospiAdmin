const { Router } = require('express');

const { getTipoConsulta }= require('../controllers/tipoconsulta.controllers')
const router=Router();

router.get('/', getTipoConsulta )

module.exports=router