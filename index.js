// Importamos bibliotecas, cargar el módulo -- en este archivo
const express = require('express');
// Importar el módulo de PATH
const path = require('path');
// Creación de la instancia
const app = express();
// Definir el puerto para escuchar las solicitudes
const port = 3000;

// Creación de las rutas 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el Servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
