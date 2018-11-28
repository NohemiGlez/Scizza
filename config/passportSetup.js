const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const GitHubStrategy = require('passport-github2');
const keys = require('./keys');
const DeveloperMember = require('../models/developerMember');
const ObjectID = require('mongodb').ObjectID;

passport.serializeUser((developerMember, done) => {
  done(null, developerMember.id);
});

passport.deserializeUser((id, done) => {
  DeveloperMember.findById(id).then((developerMember) => {
    done(null, developerMember);
  });
});

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
        done(null, currentDeveloperMember);
      } else {
        // si no existe el usuario se crea en la base de datos
        new DeveloperMember({
          _id: new ObjectID(),
          _google_provider_id: profile.id,
          _fullName: profile.displayName
        }).save().then((newDeveloperMember) => {
          console.log('Nuevo usuario: ' + newDeveloperMember);
          done(null, newDeveloperMember);
        });
      }
    });
  })
);

passport.use (
  new LinkedInStrategy({
    callbackURL: 'http://localhost:3000/auth/linkedin/redirect',
    clientID: keys.linkedin.clientID,
    clientSecret: keys.linkedin.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    // comprobar si ya existe el usuario
    DeveloperMember.findOne({
      _linkedin_provider_id: profile.id
    }).then((currentDeveloperMember) => {
      if(currentDeveloperMember) {
        // ya existe el usuario
        console.log('El usuario ya existe: ', currentDeveloperMember);
        done(null, currentDeveloperMember);
      } else {
        // si no existe el usuario se crea en la base de datos
        new DeveloperMember({
          _id: new ObjectID(),
          _linkedin_provider_id: profile.id,
          _fullName: profile.displayName
        }).save().then((newDeveloperMember) => {
          console.log('Nuevo usuario: ' + newDeveloperMember);
          done(null, newDeveloperMember);
        });
      }
    });
  })
);

passport.use(
  new GitHubStrategy({
    callbackURL: '/auth/github/redirect',
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    DeveloperMember.findOne({
      _github_provider_id: profile.id
    }).then((currentDeveloperMember) => {
      if(currentDeveloperMember) {
        console.log('El usuario ya existe: ', currentDeveloperMember);
        done(null, currentDeveloperMember);
      } else {
        new DeveloperMember({
          _id: new ObjectID(),
          _github_provider_id: profile.id,
          _fullName: profile.displayName
        }).save().then((newDeveloperMember) => {
          console.log('Nuevo usuario: ' + newDeveloperMember);
          done(null, newDeveloperMember);
        });
      }
    });
  })
);
