const { response } =require('express')
const bcrypt=require('bcryptjs')
const Envio = require('../models/envioMasivo');
const { generarJWT } = require('../helpers/jwt');


const guardarEnvio = async (req,res=response)=>{
    
    const id=req.id
   
    const envio=new Envio({
            usuario:id,
            medico:id,
            ...req.body});
    envio.fecha=new Date()
       
    console.log("hola")
    try{
       
       const envioDb=await envio.save()

        res.json({
            ok:true,
            envio: envioDb,
            msg:"prueba"
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Contacte con el administrador"
        })

    }
   
}

const getEnvio = async(req,res=response)=>{
    const envios= await Envio.find().sort({fecha: -1}).limit(1)

                      
    res.json({
        ok:true,
        envios
    })
}
module.exports={
    guardarEnvio,
    getEnvio
}