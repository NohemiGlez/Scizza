const express = require('express');

function get(req, res, next){
    // Ahorita lo hago jeje
    res.send('Cerrando sesion');
}

module.exports = {
    get
}
