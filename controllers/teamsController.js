const express = require('express');

function create(req, res, next) {
    res.send(`Crea un nuevo equipo`);
}

function read(req, res, next) {
    res.send(`Devuelve un equipo con ID: ${req.params.id}`);
}

function readAll(req, res, next) {
    res.send(`devuelve todos los equipos registrados`)
}

function update(req, res, next) {
    res.send(`Edita la informacion de un equipo con ID: ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`Elimina un equipo tal que la ID sea: ${req.params.id}`);
}

module.exports = {
    create,
    read,
    readAll,
    update,
    destroy
}
