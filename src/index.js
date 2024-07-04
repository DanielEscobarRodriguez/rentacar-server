'use strict'

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from 'config';  // Asegúrate de que config esté correctamente importado
import api from './views/index.js';

const app = express();

// Configuración de middleware
app.use(cors()); // Habilita CORS para todas las rutas
app.use(bodyParser.json()); // Soporte para cuerpos codificados en JSON

// Montar el enrutador API en la ruta /api
app.use('/api', api);

// Manejo básico de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo va mal!');
});

// Obtener el puerto del archivo de configuración
const port = config.get('server.port');

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Bienvenido al servidor de Rent-A-Car`);
  console.log(`   Examen UAX 4 de junio de 2024`);
  console.log(`Servidor corriendo en el puerto ${port}`);
});
