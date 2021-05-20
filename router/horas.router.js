const { Router } = require('express');

const { getHoras }= require('../controllers/horas.controllers')
const router=Router();

router.get('/', getHoras )

module.exports=router