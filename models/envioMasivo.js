const{ Schema, model }=require('mongoose');

const EnvioMasivoSchema=Schema({

    fecha: 
    { 
        type:Date,
        required:false,
    },
    medico:{
        type:[Schema.Types.ObjectId],
        ref:'medico',
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'usuario',
        required:true
    }
   
},{collection:'envio'});
module.exports=model('envio',EnvioMasivoSchema)