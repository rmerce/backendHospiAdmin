const { Router } = require('express');

const { getDiasSemana }= require('../controllers/diasemana.controllers')
const router=Router();

router.get('/', getDiasSemana )

module.exports=router