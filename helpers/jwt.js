const jwt = require('jsonwebtoken')

const generarJWT = ( id ) =>{
    return new Promise((resolve, reject)=>{
        const payload={
            id
        };
    
        //Crear el token y firmar el payload
        jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn:'12h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT')
            }
            else{
                resolve(token);
            }
        });

    });
    

}
module.exports={
    generarJWT
}