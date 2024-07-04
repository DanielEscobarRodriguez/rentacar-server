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

// Ruta para obtener la disponibilidad de un vehículo específico por ID de vehículo
router.get('/:vehicleId', (req, res) => {
    const { vehicleId } = req.params;
    const { start, end } = req.query;

    if (!start || !end) {
        return res.status(400).json({ error: "Se requieren los parámetros 'start' y 'end' para la consulta." });
    }

    const data = loadData();
    const vehicle = data.vehicles.find(v => v.id === parseInt(vehicleId));
    if (!vehicle) {
        return res.status(404).send('Vehículo no encontrado');
    }

    // Filtrar los alquileres que corresponden al ID del vehículo y verificar disponibilidad
    const isAvailable = !data.alquileres.some(alquiler => {
        return alquiler.vehicleId === parseInt(vehicleId) &&
               !(alquiler.end < start || alquiler.start > end);
    });

    if (isAvailable) {
        res.json({ message: "Vehículo disponible", vehicleId: vehicleId, availableFrom: start, availableUntil: end });
    } else {
        res.status(404).json({ message: "Vehículo no disponible en las fechas especificadas" });
    }
});

export default router;
