'use strict'

import { Router } from 'express';
import fs from 'fs';
import path from 'path';

let router = Router();

// Función para cargar datos del JSON
function loadData() {
    const jsonPath = path.join(__dirname, '../../../models/data.json'); // Ajusta la ruta según tu estructura
    const fileData = fs.readFileSync(jsonPath, 'utf8');
    return JSON.parse(fileData);
}

// Función para guardar datos en el JSON
function saveData(data) {
    const jsonPath = path.join(__dirname, '../../../models/data.json');
    const dataString = JSON.stringify(data, null, 2);
    fs.writeFileSync(jsonPath, dataString);
}

// Ruta para obtener todos los clientes
router.get('/', (req, res) => {
    const data = loadData();
    res.json(data.clientes);
});

// Ruta para obtener un cliente específico por ID
router.get('/:id', (req, res) => {
    const data = loadData();
    const cliente = data.clientes.find(c => c.id === parseInt(req.params.id));
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

// Ruta para crear un nuevo cliente
router.post('/', (req, res) => {
    const data = loadData();
    const newCliente = {
        id: data.clientes.length + 1,
        ...req.body
    };
    data.clientes.push(newCliente);
    saveData(data);
    res.status(201).json(newCliente);
});

// Ruta para actualizar un cliente existente
router.put('/:id', (req, res) => {
    const data = loadData();
    const clienteIndex = data.clientes.findIndex(c => c.id === parseInt(req.params.id));
    if (clienteIndex !== -1) {
        data.clientes[clienteIndex] = { ...data.clientes[clienteIndex], ...req.body };
        saveData(data);
        res.json(data.clientes[clienteIndex]);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

// Ruta para eliminar un cliente
router.delete('/:id', (req, res) => {
    const data = loadData();
    const clienteIndex = data.clientes.findIndex(c => c.id === parseInt(req.params.id));
    if (clienteIndex !== -1) {
        data.clientes.splice(clienteIndex, 1);
        saveData(data);
        res.status(204).send();
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

export default router;
