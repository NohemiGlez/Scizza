const express = require('express');

function create(req, res, next) {
    res.send(`Crea un proyecto de nombre: ${req.body.proyectName}`);
}

function read(req, res, next) {
    res.send(`Devuelve un proyecto con ID: ${req.params.id}`);
}

function update(req, res, next) {
    res.send(`Edita la informacion de un proyecto con ID: ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`Elimina un proyecto con ID: ${req.params.id}`);
}

module.exports = {
    create,
    read,
    update,
    destroy
}
