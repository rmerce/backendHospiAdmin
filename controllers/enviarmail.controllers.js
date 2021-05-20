const { response } =require('express')
const { transporter }=require('../helpers/mailer');





const enviarMail= async(req, res=response)=>{
    try{
        console.log("enmail enviado")
            await transporter.sendMail({
            from: '"HospiAdmin" <proyectomercerosello@gmail.com>', // sender address
            to: req.body.para, // list of receivers
            subject: req.body.asunto, // Subject line
            text: req.body.texto, // plain text body
            
          });
          res.json({
              ok:true,
              email:"enviado"
          })
    }catch(error)
    {
        console.log(error)
    }
}


module.exports={
    enviarMail
}

