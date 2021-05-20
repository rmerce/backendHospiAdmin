const{ Schema, model }=require('mongoose');

const HorasSchema=Schema({

    horas: 
    { 
        type:[],
        required:true,
    }
   
},{collection:'horas'});
module.exports=model('horas',HorasSchema)