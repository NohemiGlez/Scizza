const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const DeveloperMember = require('../models/developerMember');
const ObjectID = require('mongodb').ObjectID;

passport.use(
  new GoogleStrategy({
    // options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret

  }, (accessToken, refreshToken, profile, done) => {
    // comprobar si ya existe el usuario
    DeveloperMember.findOne({
      _google_provider_id: profile.id
    }).then((currentDeveloperMember) => {
      if(currentDeveloperMember) {
        // ya existe el usuario
        console.log('El usuario ya existe: ', currentDeveloperMember);
      } else {
        // si no existe el usuario se crea en la base de datos
        new DeveloperMember({
          _id: new ObjectID(),
          _google_provider_id: profile.id,
          _fullName: profile.displayName
        }).save().then((newDeveloperMember) => {
          console.log('Nuevo usuario: ' + newDeveloperMember);
        });
      }
    });
  })
);
