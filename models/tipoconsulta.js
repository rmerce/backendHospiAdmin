const{ Schema, model }=require('mongoose');

const tipoConsultaSchema=Schema({

    tipoConsulta: 
    { 
        type:[],
        required:true,
    }
   
},{collection:'tipoConsulta'});
module.exports=model('tipoConsulta',tipoConsultaSchema)