const express = require('express');
const UserSkill = require('../models/userSkill');
const DeveloperMember = require('../models/developerMember');
const {validationResult} = require('express-validator/check');
const ObjectID = require('mongodb').ObjectID;

function create(req, res, next) {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).json({
      errors:errors.array()
    });
  }

  let userSkill = new UserSkill({
    _id: req.body.id ? req.body.id : new ObjectID(),
    _user: req.user.id,
    _skill: req.body.skill,
    _level: req.body.level
  });

  userSkill.save()
    .then((obj)=>{
      res.redirect('/userSkills/get');
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
    select: '_user _skill _level'
  }

  //DeveloperMember.paginate({}, options)
    UserSkill.find({_user : req.user.id}, (err, userSkills)=>{
      DeveloperMember.populate(userSkills, {path: "_user"}, (err, userSkills)=>{
        res.render('userSkills', {
            userSkills : userSkills,
            title: 'Scizza | Proyectos',
            username: req.user,
            principalSkill: 'Desarrollador Web'
          });
      });

    }).catch((err)=>{
      res.status(500).json({
        errors: [{message: 'Algo salió mal :c'}],
        data: []
      });
    });

}

function listOne(req, res, next) {

  UserSkill.findById(req.params.id)
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

  UserSkill.findById(req.params.id)
  .then((obj)=>{
    obj.user = req.body.user ? req.body.user : obj.user;
    obj.skill = req.body.skill ? req.body.skill : obj.skill;
    obj.level = req.body.level ? req.body.level : obj.level;
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

  UserSkill.remove({_id: req.params.id})
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
