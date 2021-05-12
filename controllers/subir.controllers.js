const { response } =require('express')
const bcrypt=require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');
const { v4: uuidv4 } = require('uuid');
const { actualizarFoto }=require('../helpers/actualizarFoto')
const fs=require('fs')

//Para construir un path completo
const ruta= require('path');

const cargarArchivo= async (req,res=response)=>{
    const tipo=req.params.tipo;
    const id=req.params.id;
    const tipoValidos=['hospitales','medicos','usuarios'];

    if(!tipoValidos.includes(tipo))
    {
        return res.status(400).json({
            ok:false,
            msg:'No son o médicos,usuarios u hospitales'
        })
    }
    //Validar que exista un archivo

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:"No se ha cargado ningun archivo"
        })
      }
    
     //Procesar una imagen. Se tiene acceso a los files gracias al midelware fileUpload
      const archivo=req.files.imagen;

      //Extraer la extensión de un archivo
      const nombreCortado=archivo.name.split('.');
      const extensionArchivo=nombreCortado[nombreCortado.length-1];

      //Validar la extensión
      const extensionValida=['png','jpg','jpeg','gif']
      if (!extensionValida.includes(extensionArchivo)){
          return res.status(400).json({
              ok:false,
              msg:'No hay es una extensión válida '
          })
      }

      //Generar el nombre del archivo
      const nombreArchivo=`${ uuidv4() }.${extensionArchivo}`; 

      //Crear el path para guardar la imagen
      const ruta=`./uploads/${tipo}/${nombreArchivo}`;

      //Mover la imagen donde quiera con mv()

      archivo.mv(ruta, (err) =>{
        if (err){
            console.log(err)
            return res.status(500).json({
                ok:false,
                msg:'Error al mover la imagen'
            });

        }
        //Actualizar la base de datos
        actualizarFoto( tipo,id,nombreArchivo);


        res.json({
            ok:true,
            msg:'Archivo Cargado',
            nombrearchivo:nombreArchivo
        })
      });

}

//MOSTRAR IMAGEN
const retornarImagen=async(req,res=response)=>{
    const tipo=req.params.tipo;
    const foto=req.params.foto;
    let rutaImagen=""
    rutaImagen=ruta.join( __dirname,`../uploads/${tipo}/${foto}`)
    //IMAGEN POR DEFECTO
    if (fs.existsSync(rutaImagen)){
        res.sendFile(rutaImagen)
    }
    else{
        rutaImagen=ruta.join( __dirname,`../uploads/nodisponible.png`)
        res.sendFile(rutaImagen)
    }
    
}

module.exports={
    cargarArchivo,
    retornarImagen
}