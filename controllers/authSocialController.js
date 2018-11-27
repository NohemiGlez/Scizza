const express = require('express');

function get(req, res, next){
    // Ahorita lo hago jeje
    res.send('Iniciando con google');
}

module.exports = {
    get
}
