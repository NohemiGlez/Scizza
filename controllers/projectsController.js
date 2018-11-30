const express = require('express');
const Project = require('../models/project');
const helpers = require('./helpers/createProjectBoard');
//const DeveloperMember = require('../models/developerMember');
//const DeveloperTeam = require('../models/developerTeam');
const {validationResult} = require('express-validator/check');
const ObjectID = require('mongodb').ObjectID;

function create(req, res, next) {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).json({
      errors:errors.array()
    });
  }

  let project = new Project({
    _id: req.body.id ? req.body.id : new ObjectID(),
    _projectName: req.body.projectName,
    _projectRequestDate: req.body.projectRequestDate,
    _projectStartDate: req.body.projectStartDate,
    _projectDescription: req.body.projectDescription,
    _projectManager: req.body.projectManager,
    _productOwner: req.body.productOwner,
    _developerTeam: req.body.developerTeam
  });
  // EL formato de fecha para insertar es YYYY-MM-DD

  project.save()
    .then((obj)=>{
      res.redirect("/projects/get");
      //res.redirect('/developerMembers/get');
    })
    .catch((err)=>{
      return res.status(500).json({
        errors:[{message: 'Algo salió mal :c'}],
        data:[]
      });
    });

  helpers.createProjectBoard(project.id);
}

function listAll(req, res, next) {

  let page = req.params.page ? req.params.page : 1;
  const options = {
    page: 1,
    limit: 30,
    select: '_projectName _projectRequestDate _projectStartDate _projectDescription _projectManager _productOwner _developerTeam'
  }


  /*
    Project.find({}, (err, projects)=>{
      DeveloperMember.populate(projects, {path: "_projectManager"}, (err, projects)=>{
      });
      DeveloperMember.populate(projects, {path: "_productOwner"}, (err, projects)=>{
      });
      DeveloperTeam.populate(projects, {path: "_developerTeam"}, (err, projects)=>{
        res.status(200).send(projects);
        // Aqui devuelve el json con jsons
      });
    */

    //Project.paginate({}, options)
    //.then((objs)=>{
    Project.find({}, (err, projects)=>{
      res.render('projects', {
          projects : projects,
          title: 'Scizza | Proyectos',
          username: 'Scizzonio Peperoni',
          principalSkill: 'Desarrollador Web'
        });
      //res.status(200).send(objs);
    }).catch((err)=>{
      res.status(500).json({
        errors: [{message: 'Algo salió mal :c'}],
        data: []
      });
    });
    /*
    Project.find(function (err, docs) {
            res.render('projects', {
                projects : objs,
                title: 'Scizza | Proyectos',
                username: 'Scizzonio Peperoni',
                principalSkill: 'Desarrollador Web'
              });
    });
*/
}

function listOne(req, res, next) {

  Project.findById(req.params.id)
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

  Project.findById(req.params.id)
  .then((obj)=>{
    obj.projectName = req.body.projectName ? req.body.projectName : obj.projectName;
    obj.projectRequestDate = req.body.projectRequestDate ? req.body.projectRequestDate : obj.projectRequestDate;
    obj.projectStartDate = req.body.projectStartDate ? req.body.projectStartDate : obj.projectStartDate;
    obj.projectDescription = req.body.projectDescription ? req.body.projectDescription : obj.projectDescription;
    obj.projectManager = req.body.projectManager ? req.body.projectManager : obj.projectManager;
    obj.productOwner = req.body.productOwner ? req.body.productOwner : obj.productOwner;
    obj.developerTeam = req.body.developerTeam ? req.body.developerTeam : obj.developerTeam;
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

  Project.remove({_id: req.params.id})
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
