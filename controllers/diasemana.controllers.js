const { response } =require('express')
const DiaSemana = require('../models/diasemana');
const { generarJWT } = require('../helpers/jwt');

const getDiasSemana = async(req,res=response)=>{
    const diassemana= await DiaSemana.find()
                                    
    res.json({
        ok:true,
        diassemana
    })
}
module.exports={
    getDiasSemana
}