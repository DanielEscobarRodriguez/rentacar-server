'use strict'

import { Router } from 'express';
import fs from 'fs';
import path from 'path';

let router = Router();

// Función para cargar datos del archivo JSON
function loadData() {
    const jsonPath = path.join(__dirname, '../../../models/data.json'); // Ajusta la ruta según la estructura de tu proyecto
    const fileData = fs.readFileSync(jsonPath, 'utf8');
    return JSON.parse(fileData);
}

// Middleware para recuperar y validar el identificador del vehículo
router.param('idVehiculo', (req, res, next, idVehiculo) => {
    const data = loadData();
    const vehicle = data.vehicles.find(v => v.id === parseInt(idVehiculo));

    if (!vehicle) {
        return res.status(404).send('Vehículo no encontrado');
    }

    req.vehicle = vehicle; // Almacenar el vehículo en el objeto de solicitud para uso posterior
    next();
});

// Importación de rutas de alquileres y disponibilidad
import alquileres from './alquileres/index.js';
import disponibilidad from './disponibilidad/index.js';

// Configuración de subrutas para alquileres y disponibilidad
router.use('/:idVehiculo/alquileres', alquileres);
router.use('/:idVehiculo/disponibilidad', disponibilidad);

export default router;
