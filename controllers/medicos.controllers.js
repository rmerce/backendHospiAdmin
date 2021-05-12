const { response } =require('express')
const bcrypt=require('bcryptjs')
const Medico = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');


const getMedicos = async(req,res=response)=>{
    const medicos= await Medico.find()
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img')
                      
    res.json({
        ok:true,
        medicos
    })
}

const get1Medico = async(req,res=response)=>{
    const id=req.params.id
    try{
        const medico= await Medico.findById(id)
        .populate('usuario','nombre img')
        .populate('hospital','nombre img')

            res.json({
            ok:true,
            medico
            })
    }catch(error)
    {
        console.log(error)
        res.json({
            ok:false,
            msg:"Ha ocurrido un error contacte con el administrador"
        })
    }
   
}

const crearMedico = async (req,res=response)=>{
    const id=req.id
    const medico=new Medico({
        usuario:id,
        ...req.body});
  
    try{
       const MedicoDb=await medico.save()
        res.json({
            ok:true,
            medico: MedicoDb
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Contacte con el administrador"
        })

    }
   
}
const actualizarMedico =async(req,res=response)=>{
    try{
        const MedicoId=req.params.id
        const idUsuario=req.id

        const MedicoDb=await Medico.findById(MedicoId)
        if(!MedicoDb)
        {
            return res.status(404).json({
                ok:false,
                msg:"El médico no existe"
            })
        }
        

        const cambiosMedico={
            ...req.body,
            usuario:idUsuario
        }
        const medicoActualizado= await Medico.findByIdAndUpdate(MedicoId,cambiosMedico,{new:true});
        res.json({
            ok:true,
            medico:medicoActualizado
        })


    }catch(error){
        console.log(error)
        res.status(404).json({
            ok:false,
            msg:"Contacte con el administrador"
        })
    }
  
}
const borrarMedico =async(req,res=response)=>{
    try{
        const MedicoId=req.params.id
        const MedicoDb=await Medico.findById(MedicoId)
        if(!MedicoDb)
        {
            return res.status(404).json({
                ok:false,
                msg:"El médico no existe"
            })
        }
        
   
       await Medico.findByIdAndDelete(MedicoId)
        res.json({
            ok:true,
            msg:"Medico Eliminado"
        })


    }
    catch(error){
        console.log(error)
        res.status(404).json({
            ok:false,
            msg:"Contacte con el administrador"
        })
    }
  
}


module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    get1Medico

}