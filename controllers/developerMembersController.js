const express = require('express');
const DeveloperMember = require('../models/developerMember');
const DeveloperTeam = require('../models/developerTeam');
const Role = require('../models/role');
const {validationResult} = require('express-validator/check');
const ObjectID = require('mongodb').ObjectID;

function create(req, res, next) {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).json({
      errors:errors.array()
    });
  }

  let developerMember = new DeveloperMember({
    _id: new ObjectID(req.body.id) ? req.body.id : new ObjectID(),
    _facebook_provider_id: req.body.facebook_provider_id,
    _twitter_provider_id: req.body.twitter_provider_id,
    _google_provider_id: req.body.google_provider_id,
    _fullName: req.body.fullName,
    _birthDate: new Date(req.body.birthDate),
    _curp: req.body.curp,
    _rfc: req.body.rfc,
    _address: req.body.address,
    _team: new ObjectID(req.body.team),
    _role: new ObjectID(req.body.role)
  });

  developerMember.save()
    .then((obj)=>{
      res.status(200).json({
        errors: [],
        data: obj
      });
      //res.redirect('/developerMembers/get');
    })
    .catch((err)=>{
      return res.status(500).json({
        errors:[{message: 'Algo salió mal :c'}],
        data:[]
      });
    });

}

function listAll(req, res, next) {

  let page = req.params.page ? req.params.page : 1;
  const options = {
    page: 1,
    limit: 10,
    select: '_facebook_provider_id _twitter_provider_id _google_provider_id _fullName _birthDate _curp _rfc _address _team _role'
  }

  //DeveloperMember.paginate({}, options)
    DeveloperMember.find({}, (err, developerMembers, roles)=>{
      DeveloperTeam.populate(developerMembers, {path: "_team"}, (err, developerMembers)=>{
      });
      Role.populate(developerMembers, {path: "_role"}, (err, roles)=>{
        res.status(200).send(developerMembers);
        // Aqui devuelve el json con jsons
      });

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
    obj.facebook_provider_id = req.body.facebook_provider_id ? req.body.facebook_provider_id : obj.facebook_provider_id;
    obj.twitter_provider_id = req.body.twitter_provider_id ? req.body.twitter_provider_id : obj.twitter_provider_id;
    obj.google_provider_id = req.body.google_provider_id ? req.body.google_provider_id : obj.google_provider_id;
    obj.fullName = req.body.fullName ? req.body.fullName : obj.fullName;
    obj.birthDate = req.body.birthDate ? req.body.birthDate : obj.birthDate;
    obj.curp = req.body.curp ? req.body.curp : obj.curp;
    obj.rfc = req.body.rfc ? req.body.rfc : obj.rfc;
    obj.address = req.body.address ? req.body.address : obj.address;
    obj.team = new ObjectID(req.body._team) ? req.body.team : obj.team;
    obj.role = new ObjectID(req.body.role) ? req.body.role : obj.role;
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
