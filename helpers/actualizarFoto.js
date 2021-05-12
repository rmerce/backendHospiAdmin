const Usuario=require('../models/usuario')
const Medico=require('../models/medico')
const Hospital=require('../models/hospital')
//Comprobar si existe el archivo del sistema con file sistem
const fs=require('fs')

const borrarImagen=(rutaAntigua)=>{
   
    if (fs.existsSync(rutaAntigua)){
        //borrar la imagen anterior
        fs.unlinkSync(rutaAntigua)
    }

}

const actualizarFoto= async (tipo,id,nombreArchivo)=>{
    let rutaAntigua=""
    switch (tipo) {
        case 'medicos':
            const medico=await Medico.findById(id);
            if (!medico){
                console.log('No existe el médico por id')
                return false
            }

            rutaAntigua=`./uploads/medicos/${medico.img}`;
            borrarImagen(rutaAntigua)

            medico.img=nombreArchivo;       
            await medico.save();
            return true

        break;

        case 'hospitales':

            const hospital=await Hospital.findById(id);
            if (!hospital){
                console.log('No existe el hospital por id')
                return false
            }

            rutaAntigua=`./uploads/hospitales/${hospital.img}`;
            borrarImagen(rutaAntigua)

            hospital.img=nombreArchivo;       
            await hospital.save();
            return true
            
        break;

        case 'usuarios':
            const usuario=await Usuario.findById(id);
            if (!usuario){
                console.log('No existe el usuario por id')
                return false
            }

            rutaAntigua=`./uploads/usuarios/${usuario.img}`;
            borrarImagen(rutaAntigua)

            usuario.img=nombreArchivo;       
            await usuario.save();
            return true
            
            
        break;
   
    }
    
   

}
module.exports={
    actualizarFoto
}