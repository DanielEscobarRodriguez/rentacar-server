const { vehiculos } = require('../models/data');

// Obtener todos los vehículos
exports.getAllVehicles = (req, res) => {
    res.json(vehiculos);
};

// Obtener un vehículo por ID
exports.getVehicleById = (req, res) => {
    const vehicle = vehiculos.find(v => v.id === parseInt(req.params.id));
    if (!vehicle) return res.status(404).send('El vehículo no fue encontrado.');
    res.json(vehicle);
};

// Crear un nuevo vehículo
exports.createVehicle = (req, res) => {
    const newVehicle = {
        id: vehiculos.length + 1,
        modelo: req.body.modelo,
        tipoCombustible: req.body.tipoCombustible
    };
    vehiculos.push(newVehicle);
    res.status(201).send(newVehicle);
};

// Actualizar un vehículo
exports.updateVehicle = (req, res) => {
    const vehicle = vehiculos.find(v => v.id === parseInt(req.params.id));
    if (!vehicle) return res.status(404).send('El vehículo no fue encontrado.');

    vehicle.modelo = req.body.modelo || vehicle.modelo;
    vehicle.tipoCombustible = req.body.tipoCombustible || vehicle.tipoCombustible;
    res.send(vehicle);
};

// Borrar un vehículo
exports.deleteVehicle = (req, res) => {
    const index = vehiculos.findIndex(v => v.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('El vehículo no fue encontrado.');

    vehiculos.splice(index, 1);
    res.status(204).send();
};
