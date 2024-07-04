'use strict'

import { Router } from 'express';
import fs from 'fs';
import path from 'path';

let router = Router();

// Función para cargar datos del JSON
function loadData() {
    const jsonPath = path.join(__dirname, '../../models/data.json'); // Ajusta el camino según la estructura de tu proyecto
    const fileData = fs.readFileSync(jsonPath, 'utf8');
    return JSON.parse(fileData);
}

// Ruta para recuperar vehículos disponibles
router.get('/', (req, res) => {
    const { start, end } = req.query;

    if (!start || !end) {
        return res.status(400).json({ error: "Se requieren los parámetros 'start' y 'end'." });
    }

    const data = loadData();
    const availableVehicles = data.vehicles.filter(vehicle => {
        // Verificar cada vehículo si está disponible en el rango de tiempo
        const reservations = vehicle.reservations || [];
        return !reservations.some(reservation => {
            return !(reservation.end < start || reservation.start > end);
        });
    });

    res.json(availableVehicles);
});

export default router;
