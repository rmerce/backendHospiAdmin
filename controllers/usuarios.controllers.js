const { response } =require('express')
const bcrypt=require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


//TRAER TODOS LOS USUARIOS
const getUsuarios= async (req,res)=>
{
    const desde = Number(req.query.desde) || 0;

    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email rol google img')
            .skip( desde )
            .limit( 5 ),

        Usuario.countDocuments()
    ]);


    res.json({
        ok: true,
        usuarios,
        total
    });

   
}

//CREAR UN USUARIO
const crearUsuario=async (req,res)=>{
    const { email, password }=req.body
   
    
    try{
        //Validar antes de insertar que el correo existe
        const existeEmail= await Usuario.findOne({email});
        if (existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya se ha registrado'
            })
        }
        const usuario=new Usuario(req.body);
   
        //Encriptar el pass. Salt datos de manera aleatoria
        const salt = bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password, salt);

        //Guardo el usuario
        await usuario.save();
        
        //Generar un TOKEN -JWT
        const token= await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token,
            msg:"Usuario Creado"
    
        })    
    }
    catch(error) {
         res.status(500).json({
       
            ok:false,
            msg:"Error inesperado...Revisar logs"
        })  
    }    
}


//ACTUALIZAR USUARIO
const actualizarUsuario=async(req,res=response)=>{
    //VALIDAR CON TOKEN
    const id=req.params.id;
    try{
        const usuario= await Usuario.findById(id);
        if (!usuario)
        {
            return res.status(404).json({
                ok:false,
                msg:"No existe un usuario por ese id"
            })
        }
         //Actualizar
        const {google,password,email,...campos} =req.body;
        if (usuario.email!==email){
            const existeEmail=await Usuario.findOne({ email})
            if(existeEmail){
                return res.json({
                    ok:false,
                    msg:"Ya existe el usuario con ese correcto",
                   
                })
               
            }
        }
       if (!usuario.google){
        campos.email=email;
       }
       else if(usuario.email!==email){
            return res.status(400).json({
                ok:false,
                msg:"Usuarios de Google no pueden cambiar su correo"
            })
       }
        

        const usuarioActualizado= await Usuario.findByIdAndUpdate(id,campos,{new:true})
        res.json({
            ok:true,
            usuario:usuarioActualizado
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }
}
//BORRAR USUARIO

const borrarUsuario=async(req,res=response)=>{
    const id=req.params.id

    try{
        const usuario= await Usuario.findById(id);
        if (!usuario)
        {
            return res.status(404).json({
                ok:false,
                msg:"No existe un usuario por ese id"
            })
        }
        await Usuario.findByIdAndDelete(id);

        res.json({
           ok:true,
           msg:"Usuario Eliminado"
         
        })


    }catch (error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Contacta con el administrador"
        })
    }
}

module.exports={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}