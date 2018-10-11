const express = require('express');

function login(req, res, next){
    res.send(`Intentando iniciar sesion con usuario: ${req.body.usr} y
    contraseña: ${req.body.pass}`);
}

function get(req, res, next){
    res.render('login', {});
}

module.exports = {
    login,
    get
}