const express = require('express');
const DeveloperTeam = require('../models/developerTeam');
const {validationResult} = require('express-validator/check');
var ObjectID = require('mongodb').ObjectID;

function create(req, res, next) {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).json({
      errors:errors.array()
    });
  }

  let developerTeam = new DeveloperTeam({
    _id: req.body.id ? req.body.id : new ObjectID(),
    _teamName:req.body.teamName
  });

  developerTeam.save()
    .then((obj)=>{
      res.redirect('/developerTeams/get');
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
    select: '_teamName'
  }
/*
  DeveloperTeam.paginate({}, options)
    .then((objs)=>{
      res.render('developerTeams/listAll',{developerTeams:objs});
*/
    DeveloperTeam.find({}, (err, developerTeams)=>{
      res.render('developerTeams', {
        developerTeams : developerTeams,
        title: 'Scizza | Proyectos',
        username: 'Scizzonio Peperoni',
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

  DeveloperTeam.findById(req.params.id)
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

  DeveloperTeam.findById(req.params.id)
  .then((obj)=>{
    obj.teamName = req.body.teamName ? req.body.teamName : obj.teamName;
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

  DeveloperTeam.remove({_id: req.params.id})
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
