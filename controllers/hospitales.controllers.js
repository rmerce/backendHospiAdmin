const { response } =require('express')
const bcrypt=require('bcryptjs')
const Hospital = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');
const hospital = require('../models/hospital');
const { rawListeners } = require('../models/hospital');

const getHospitales = async(req,res=response)=>{
    const hospitales= await Hospital.find()
                                    .populate('usuario','nombre img')

    res.json({
        ok:true,
        hospitales
    })
}
const crearHospital =async (req,res=response)=>{
    const id=req.id;    
    const hospital=new Hospital({
        usuario:id,
        ...req.body});
        
        try{
            const hospitalDB= await hospital.save()
            res.json({
                ok:true,
                hospital:hospitalDB
            });
        }catch(error){
            console.log(error)
            res.status(500).json({
                ok:false,
                msg:"Contacta con el administrador"
            })
        }
}
const actualizarHospital =async(req,res=response)=>{
    try{
        const hospitalId=req.params.id
        const idUsuario=req.id
        const hospitalDb=await Hospital.findById(hospitalId)
        if(!hospitalDb)
        {
            return res.status(404).json({
                ok:false,
                msg:"El hospital no existe"
            })
        }
        
        const cambiosHospital={
            ...req.body,
            usuario:idUsuario
        }
        const hospitalActualizado= await Hospital.findByIdAndUpdate(hospitalId,cambiosHospital,{new:true});
        res.json({
            ok:true,
            hospital:hospitalActualizado
        })
    }catch(error)
    {
        console.log(error)
        res.status(500).json(
            {
                ok:false,
                msg:"Hable con el administrador"
            }
        )
    }
}
const borrarHospital =async(req,res=response)=>{

    try{
        const hospitalId=req.params.id

        const hospitalDb=await Hospital.findById(hospitalId)
        if(!hospitalDb)
        {
            return res.status(404).json({
                ok:false,
                msg:"El hospital no existe"
            })
        }
        
       
         await Hospital.findByIdAndDelete(hospitalId);
        
        res.json({
            ok:true,
            msg:'Hospital Eliminado'
        })
    }catch(error){
        console.log(error)
        res.status(404).json({
            ok:false,
            msg:"Contacte con el admistrador"
        })
    }

   
}

module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital

}