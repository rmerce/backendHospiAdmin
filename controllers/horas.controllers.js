const { response } =require('express')
const Horas = require('../models/horas');
const { generarJWT } = require('../helpers/jwt');

const getHoras = async(req,res=response)=>{
    const horas= await Horas.find()
                                    
    res.json({
        ok:true,
        horas
    })
}
module.exports={
    getHoras
}