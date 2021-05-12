const { response } = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu');

const login= async(req, res=response)=>{

    const {email,password}=req.body;

    try{
      
      const usuarioBd= await Usuario.findOne({email});
      //Comprobar Email
      if (!usuarioBd){
          return res.status(404).json({
              ok:false,
              msg:"El e-mail o contraseña es incorrecto"
          })
      }
      //Comprobar Contraseña con compareSync de la libreria bcrypt
      const validPass = bcrypt.compareSync( password, usuarioBd.password)
      if (!validPass){
          return res.status(404).json({
              ok:false,
              msg:"El e-mail o contraseña es incorrecto"
          })
      }

      //Generar un TOKEN -JWT
      const token= await generarJWT(usuarioBd.id);

       res.json({
           ok:true,
           nombre:usuarioBd.nombre,
           token,
           menu:getMenuFrontEnd(usuarioBd.rol)
       });

    }catch(error)
    {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Contacta con el administrador'
        });

    }
}

const googleLogin=async (req, res=response)=>{

    const googleToken=req.body.token

    try{
        const { name,email,picture}=await googleVerify(googleToken)
        
        //Verificar si existe el correo en la bd
        const usuarioBd= await Usuario.findOne({email});
        let usuario
        if (!usuarioBd){
            usuario=new Usuario({
                nombre:name,
                email,
                password:'***',
                img:picture,
                google:true

            })
        }
        else{
            //EXISTE EL USUARIO
            usuario=usuarioBd;
            usuario.google=true;
            
        }
        //Guardar en bd
        await usuario.save();

        // Generar JWT
        const token= await generarJWT(usuario.id);
        res.json({
            ok:true,
            token,
            menu:getMenuFrontEnd(usuario.rol),
            nombre:usuario.nombre
        });



    } catch(error){
        res.status(401).json({
            ok:false,
            msg:"El token no es correcto"
        })
    }
    
}

const renovarToken= async (req, res=response)=>{
    const id=req.id
    //Generar JWT
    const token= await generarJWT(id);
    const usuario=await Usuario.findById(id)
    res.json({
        ok:true, 
        token,
        usuario,
        menu:getMenuFrontEnd(usuario.rol)
    })
}

module.exports={
    login,
    googleLogin,
    renovarToken
   
}