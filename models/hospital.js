const{ Schema, model }=require('mongoose');

const HospitalSchema=Schema({
    nombre:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
   
},{collection:'hospitales'});
module.exports=model('Hospital',HospitalSchema)