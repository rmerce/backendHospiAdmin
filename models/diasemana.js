const{ Schema, model }=require('mongoose');

const diaSemanaSchema=Schema({

    diasemana: 
    { 
        type:[],
        required:true,
    }
   
},{collection:'diaSemana'});
module.exports=model('diaSemana',diaSemanaSchema)