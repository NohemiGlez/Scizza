const express = require('express');
const Role = require('../models/role');
const {validationResult} = require('express-validator/check');
var ObjectID = require('mongodb').ObjectID;

function create(req, res, next) {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).json({
      errors:errors.array()
    });
  }

  let role = new Role({
    _id: req.body.id ? req.body.id : new ObjectID(),
    _role:req.body.role
  });

  role.save()
    .then((obj)=>{
      res.redirect('/roles/get');
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
    select: '_role'
  }
/*
  DeveloperTeam.paginate({}, options)
    .then((objs)=>{
      res.render('developerTeams/listAll',{developerTeams:objs});
*/
    Role.find({}, (err, roles)=>{
      res.render('roles', {
        roles : roles,
        title: 'Scizza | Proyectos',
        username: req.user,
        principalSkill: 'Desarrollador Web'
      });
    }).catch((err)=>{
    res.status(500).json({
      errors: [{message: 'Algo salió mal :c'}],
      data: []
    });
  });

}

function listOne(req, res, next) {

  Role.findById(req.params.id)
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

  Role.findById(req.params.id)
  .then((obj)=>{
    obj.role = req.body.role ? req.body.role : obj.role;
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

  Role.remove({_id: req.params.id})
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
