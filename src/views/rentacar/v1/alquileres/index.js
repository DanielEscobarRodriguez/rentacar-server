'use strict'

import { Router } from 'express';
import disponibilidad from './disponibilidad/index.js';

let router = Router();

// Ruta para obtener todos los alquileres
router.get('/', (req, res) => {
    // Aquí iría la lógica para obtener todos los alquileres de la base de datos o fuente de datos
    res.json({ message: "Todos los alquileres" });
});

// Ruta para obtener un alquiler específico por ID
router.get('/:id', (req, res) => {
    // Simula obtener un alquiler por ID
    const id = req.params.id;
    res.json({ message: `Alquiler ${id}` });
});

// Ruta para crear un nuevo alquiler
router.post('/', (req, res) => {
    // Lógica para añadir un nuevo alquiler a la base de datos
    res.status(201).json({ message: "Alquiler creado" });
});

// Ruta para actualizar un alquiler existente
router.put('/:id', (req, res) => {
    // Lógica para actualizar un alquiler existente
    const id = req.params.id;
    res.json({ message: `Alquiler ${id} actualizado` });
});

// Ruta para eliminar un alquiler
router.delete('/:id', (req, res) => {
    // Lógica para eliminar un alquiler
    const id = req.params.id;
    res.status(204).json({ message: `Alquiler ${id} eliminado` });
});

// Integrar el router de disponibilidad
router.use('/disponibilidad', disponibilidad);

export default router;
