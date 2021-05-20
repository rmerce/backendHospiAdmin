const{ Schema, model }=require('mongoose');

const HorarioSchema=Schema({
    diasemana:{
        type:String,
        required:true
    },
    hora:{
        type:String,
        required:true
    },
    tipoconsulta:{
        type:String,
        required:true
    },
    medico:{
        type:Schema.Types.ObjectId,
        ref:'Medico',
        required:true
    }
   
},{collection:'Horario'});
module.exports=model('Horario',HorarioSchema)