const mongoose = require('mongoose');


//Con esto retorno una promesa 
const dbconexion=async()=>{
    try{
        await mongoose.connect(process.env.DB_CNN, 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex:true
        });
        console.log('Bd Online');
    }
    catch(error){
        console.log(error);
        throw new Error("Eror a la hora de iniciar la bd ver logs")
    }
}
module.exports={
    dbconexion
}