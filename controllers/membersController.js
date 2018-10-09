const express = require('express');

function create(req, res, next) {
    res.send(`El miembro ${req.body.fullName}`);
}

function read(req, res, next) {
    res.send(`Devuelve un miembro con ID: ${req.params.id}`);
}

function update(req, res, next) {
    res.send(`Edita la informacion de un miembro con ID: ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`Elimina un miembro con ID: ${req.params.id}`);
}

module.exports = {
    create,
    read,
    update,
    destroy
}