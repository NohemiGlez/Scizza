const passport = require('passport');
const express = require('express');

function get(req, res, next){
    // Ahorita lo hago jeje
    req.logout();
    res.redirect('/');
}

module.exports = {
    get
}
