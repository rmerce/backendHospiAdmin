const nodemailer=require("nodemailer")

const  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "proyectomercerosello@gmail.com", // generated ethereal user
      pass: "zpsgsyrzlttwvdfu", // generated ethereal password
    },
  });

  transporter.verify().then(()=>{
      console.log("Preparado para enviar email")
    })

  module.exports={
    transporter
    }