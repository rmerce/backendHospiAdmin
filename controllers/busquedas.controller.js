
const { response } =require('express')
const bcrypt=require('bcryptjs')
const Usuario=require('../models/usuario')
const Medico=require('../models/medico')
const Hospital=require('../models/hospital')
const { generarJWT } = require('../helpers/jwt');


const getBusquedasTotales= async(req,res=response)=>{
    
    const busqueda=req.params.busqueda ;
    const regex= new RegExp(busqueda, 'i')
    

    const [usuarios,medicos,hospitales]= await Promise.all([
        await Usuario.find({nombre: regex}),
        await Medico.find({nombre: regex}),
        await Hospital.find({nombre: regex})
    ])

    res.json({
        ok:true,
        msg:"Busquedas",
        usuarios,
        medicos,
        hospitales
    })
}

const getBusquedaColeccion=async(req, res=response)=>{
    const tabla=req.params.tabla ;
    const busqueda=req.params.busqueda ;
    const regex= new RegExp(busqueda, 'i')
    let data=[];
    
    switch(tabla){
        case 'medicos':
            data= await Medico.find({nombre: regex})
                              .populate('usuario','nombre img')
                              .populate('hospital','nombre img');
            break;
        case 'hospitales':
            data=await Hospital.find({nombre: regex})
                                .populate('usuario','nombre img');
            break;
        case 'usuarios':
            data= await Usuario.find({nombre: regex});
            break;
        default: 
            return res.status(400).json({
                ok:false,
                msg:'la tabla tiene que ser: usuarios,medicos, hospitales'
            })      
    }

    res.json({
        ok:true,
        resultados:data
    })

}

module.exports={
    getBusquedasTotales,
    getBusquedaColeccion
}