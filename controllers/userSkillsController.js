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
    _user: req.body.user,
    _skill: req.body.skill
  });

  userSkill.save()
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
    select: '_user _skill'
  }

  //DeveloperMember.paginate({}, options)
    UserSkill.find({}, (err, userSkills)=>{
      DeveloperMember.populate(userSkills, {path: "_user"}, (err, userSkills)=>{
        res.status(200).send(userSkills);
        // Aqui devuelve el json con json.
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
