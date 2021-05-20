const { response } =require('express')
const tipoConsulta = require('../models/tipoconsulta');
const { generarJWT } = require('../helpers/jwt');

const getTipoConsulta = async(req,res=response)=>{
    const tipoConsultas= await tipoConsulta.find()
                                    
    res.json({
        ok:true,
        tipoConsultas
    })
}
module.exports={
    getTipoConsulta
}