const express = require('express');

function create(req, res, next) {
    res.send(`Crea un rol de nombre: ${req.body.roleName}`);
}

function read(req, res, next) {
    res.send(`Devuelve un rol con ID: ${req.params.id}`);
}

function update(req, res, next) {
    res.send(`Edita la informacion de un rol con ID: ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`Elimina un rol con ID: ${req.params.id}`);
}

module.exports = {
    create,
    read,
    update,
    destroy
}
