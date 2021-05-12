const jwt =require('jsonwebtoken')
const usuario=require('../models/usuario')

const validarJWT=(req, res, next)=>{
    //Leer el TOKEN
    const token=req.header('x-token')
    if (!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la petición'
        })
    }

    try {
        
        const { id }=jwt.verify(token, process.env.JWT_SECRET);
        req.id=id;
        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:"Token no válido"
        })
    }

    
}
const validarAdminRol= async (req,res, next)=>{
    const id=req.id
    try {
        //Leer el usuario
        const usuarioDB= await usuario.findById(id);
        if (!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:"Usuario no existe"
            })
        }
        if (usuarioDB.rol !=='ADMIN_ROLE')
        {
            return res.status(403).json({
                ok:false,
                msg:"No tiene privilegios para hacer eso"
            })
        }

        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Contacta con el administrador"
        })
    }
}

const validarAdminRoloMismoUser= async (req,res, next)=>{
    const id=req.id
    const idmodificar=req.params.id
    try {
        //Leer el usuario
        const usuarioDB= await usuario.findById(id);
        if (!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:"Usuario no existe"
            })
        }
        if (usuarioDB.rol ==='ADMIN_ROLE' || id===idmodificar)
        {
            next();
        }
        else{
            return res.status(403).json({
                ok:false,
                msg:"No tiene privilegios para hacer eso"
            })
        }

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Contacta con el administrador"
        })
    }
}

module.exports={
    validarJWT,
    validarAdminRol,
    validarAdminRoloMismoUser
}