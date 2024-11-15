// Importamos bibliotecas, cargar el módulo -- en este archivo
const express = require('express');
// Importar el módulo de PATH
const path = require('path');
// Creación de la instancia
const app = express();
// Definir el puerto para escuchar las solicitudes
const port = 3000;

//Analizador JSON
app.use(express.json());


// Creación de las rutas 
/* app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});*/

//Datos de Memoria Temporal
let usuarios = [];

//Creación de ruta POST
app.post('/usuarios',(req, res) => {
    //Variables Los campos DB
    const{id,nombre,correo}=req.body;
    //Agregar elementos al arreglo
    usuarios.push({id,nombre,correo})
    res.status(201).json({mensaje:'Usuario Creado', usuario:{id,nombre,correo}});
})

//Creación de ruta GET
app.get('/usuarios',(req, res) => {
    res.json(usuarios)
})

//Ruta para obtener un usuario ID
app.get('/usuarios:id',(req,res)=>{
    const usuario = usuarios.find(u => u.id == req.params.id);
    //Validar objeto
    if(usuario){
        //Mostrar 
        res.json(usuario)
    }
    else {
        res.status(404).json({Mensaje:"Usuario no se encuentra."})
    }
})

// Iniciar el Servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
