const express=require('express')
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const { dbconexion }=require('./database/config');

//Crear el servidor de express

const app=express();
//Base de datos
dbconexion();

//Directorio Público
app.use(express.static('public'));

//Configurar Cors MiddleWare
app.use(cors());


//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/usuarios', require('./router/usuarios.router'))
app.use('/api/login', require('./router/auth.router'))
app.use('/api/hospitales',require('./router/hopitales.router'))
app.use('/api/medicos',require('./router/medicos.router'))
app.use('/api/todo',require('./router/busquedas.router'))
app.use('/api/subir',require('./router/subir.router'))

//Cualquier otra ruta va a pasar por aqui
app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
})




//Acceso al puerto
app.listen(process.env.PORT,()=>{
    console.log("Servidor en el puerto " + process.env.PORT)
})