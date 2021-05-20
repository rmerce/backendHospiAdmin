const { response } =require('express')
const Horario = require('../models/horario');
const { generarJWT } = require('../helpers/jwt');



const getHorariobyIdMedico = async(req,res=response)=>{
    const id=req.params.id
    console.log(id)
    
    try{
        const horario= await Horario.find({medico:id})
        .populate('medico','nombre email')
    
            res.json({
            ok:true,
            horario
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
const crearHorario = async (req,res=response)=>{
    const horario=new Horario({
        ...req.body});


    try{
       
      const horarioDb=await horario.save()

        res.json({
            ok:true,
            horarioDb: horarioDb
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Contacte con el administrador"
        })

    }
   
}
const borrarHorario =async(req,res=response)=>{

    try{
        const horarioId=req.params.id

        const horarioDb=await Horario.findById(horarioId)
        if(!horarioDb)
        {
            return res.status(404).json({
                ok:false,
                msg:"El horario no existe"
            })
        }
        
       
         await Horario.findByIdAndDelete(horarioId);
        
        res.json({
            ok:true,
            msg:'Horario Eliminado'
        })
    }catch(error){
        console.log(error)
        res.status(404).json({
            ok:false,
            msg:"Contacte con el admistrador"
        })
    }

   
}
const actualizarHorario =async(req,res=response)=>{
    try{
        const horarioId=req.params.id
        const horarioDb=await Horario.findById(horarioId)
        if(!horarioDb)
        {
            return res.status(404).json({
                ok:false,
                msg:"El horario no existe"
            })
        }
        
        const cambiosHorario={
            ...req.body
        }
        const horarioActualizado= await Horario.findByIdAndUpdate(horarioId,cambiosHorario,{new:true});
        res.json({
            ok:true,
            horario:horarioActualizado
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

module.exports={
    getHorariobyIdMedico,
    crearHorario,
    borrarHorario,
    actualizarHorario
}