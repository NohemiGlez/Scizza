const passport = require('passport');
const express = require('express');
const DeveloperMember = require('../models/developerMember');
//const DeveloperTeam = require('../models/developerTeam');
//const Role = require('../models/role');
const {validationResult} = require('express-validator/check');
const ObjectID = require('mongodb').ObjectID;

passport.serializeUser((developerMember, done) => {
  done(null, developerMember.id);
});

passport.deserializeUser((id, done) => {
  DeveloperMember.findById(id).then((developerMember) => {
    done(null, developerMember);
  });
});

function create(req, res, next) {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).json({
      errors:errors.array()
    });
  }

  DeveloperMember.remove({_id: req.user.id})
  .then(() => {
    let developerMember = new DeveloperMember({
      _id: req.body.id ? req.body.id : new ObjectID(),
      _linkedin_provider_id: req.body.linkedin_provider_id,
      _github_provider_id: req.body.github_provider_id,
      _google_provider_id: req.body.google_provider_id,
      _fullName: req.body.fullName,
      _birthDate: req.body.birthDate,
      _curp: req.body.curp,
      _rfc: req.body.rfc,
      _address: req.body.address,
      _team: req.body.team,
      _role: req.body.role,
      _permission: req.body.permission
    });
    // EL formato de fecha para insertar es YYYY-MM-DD

    developerMember.save()
      .then((developerMember)=>{
        //res.status(200).json({
        //  errors: [],
        //  data: obj
        //});
        done(null, developerMember);
        conole.log(developerMember);
        res.redirect('projects/get');
      })
      .catch((err)=>{
        return res.status(500).json({
          errors:[{message: 'Algo salió mal :c'}],
          data:[]
        });
      });
  })
  .catch((err)=>{
    res.status(500).json({
      errors: [{ message: 'Algo salió mal :c' }],
      data: []
    });
  });

}

function listAll(req, res, next) {

  let page = req.params.page ? req.params.page : 1;
  const options = {
    page: 1,
    limit: 10,
    select: '_linkedin_provider_id _github_provider_id _google_provider_id _fullName _birthDate _curp _rfc _address _team _role _permission'
  }

  /*
    DeveloperMember.find({}, (err, developerMembers)=>{
      DeveloperTeam.populate(developerMembers, {path: "_team"}, (err, developerMembers)=>{
      });
      Role.populate(developerMembers, {path: "_role"}, (err, developerMembers)=>{
        res.status(200).send(developerMembers);
        // Aqui devuelve el json con jsons
      });
*/
    DeveloperMember.paginate({}, options)
    .then((objs)=>{
      //res.render('developerMembers/listAll',{developerMembers:objs});
      res.status(200).send(objs);
    }).catch((err)=>{
      res.status(500).json({
        errors: [{message: 'Algo salió mal :c'}],
        data: []
      });
    });

}

function listOne(req, res, next) {

  DeveloperMember.findById(req.params.id)
      .then((obj)=>{
        res.status(200).json({
          errors: [],
          data: obj
        });
      })
      .catch((err)=>{
        res.status(500).json({
          errors: [{message: 'Algo salió mal :c'}],
          data: []
        });
      });

}

function update(req, res, next) {

  DeveloperMember.findById(req.params.id)
  .then((obj)=>{
    obj.linkedin_provider_id = req.body.linkedin_provider_id ? req.body.linkedin_provider_id : obj.linkedin_provider_id;
    obj.github_provider_id = req.body.github_provider_id ? req.body.github_provider_id : obj.github_provider_id;
    obj.google_provider_id = req.body.google_provider_id ? req.body.google_provider_id : obj.google_provider_id;
    obj.fullName = req.body.fullName ? req.body.fullName : obj.fullName;
    obj.birthDate = req.body.birthDate ? req.body.birthDate : obj.birthDate;
    obj.curp = req.body.curp ? req.body.curp : obj.curp;
    obj.rfc = req.body.rfc ? req.body.rfc : obj.rfc;
    obj.address = req.body.address ? req.body.address : obj.address;
    obj.team = req.body.team ? req.body.team : obj.team;
    obj.role = req.body.role ? req.body.role : obj.role;
    obj.permission = req.body.permission ? req.body.permission : obj.permission;
    obj.save()
    .then((obj)=>{
      res.status(200).json({
        errors: [],
        data: obj
      });
    })
    .catch((err)=>{
      res.status(500).json({
        errors: [{ message: 'Algo salió mal :c' }],
        data: []
      })
    });
  })
  .catch((err)=>{
    res.status(500).json({
      errors: [{ message: 'Algo salió mal :c' }],
      data: []
    });
  });

}

function destroy(req, res, next) {

  DeveloperMember.remove({_id: req.params.id})
  .then((obj)=>{
    res.status(200).json({
      errors: [],
      data: obj
    });
  })
  .catch((err)=>{
    res.status(500).json({
      errors: [{ message: 'Algo salió mal :c' }],
      data: []
    });
  });

}

module.exports = {
    create,
    listOne,
    listAll,
    update,
    destroy
}
