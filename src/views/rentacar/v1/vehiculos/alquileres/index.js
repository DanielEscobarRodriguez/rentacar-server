'use strict'

import { Router } from 'express';
import fs from 'fs';
import path from 'path';

let router = Router();

// Función para cargar datos del archivo JSON
function loadData() {
    const jsonPath = path.join(__dirname, '../../../../models/data.json'); // Ajusta la ruta a tu estructura de proyecto
    const fileData = fs.readFileSync(jsonPath, 'utf8');
    return JSON.parse(fileData);
}

// Ruta para obtener los alquileres de un vehículo específico por ID de vehículo
router.get('/:vehicleId', (req, res) => {
    const { vehicleId } = req.params;
    const data = loadData();

    // Filtrar los alquileres que corresponden al ID del vehículo
    const vehicleRentals = data.alquileres.filter(alquiler => alquiler.vehicleId === parseInt(vehicleId));

    if (vehicleRentals.length > 0) {
        res.json(vehicleRentals);
    } else {
        res.status(404).send('No se encontraron alquileres para el vehículo especificado');
    }
});

export default router;
