const express = require('express');
const Sprint = require('../models/sprint');
const Project = require('../models/project');
const UserStory = require('../models/userStory');
const {validationResult} = require('express-validator/check');
const ObjectID = require('mongodb').ObjectID;

function create(req, res, next) {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors:errors.array()
        });
    }

    let sprint = new Sprint({
        _id: req.body.id ? req.body.id : new ObjectID(),
        _name: req.body.name,
        _type: req.body.type,
        _project: req.body.project
    });

    sprint.save()
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
        select: '_name _project'
    }

    //DeveloperMember.paginate({}, options)
    Sprint.find({}, (err, sprints)=>{
        Project.populate(sprints, {path: "_project"}, (err, sprints)=>{
            res.status(200).send(sprints);
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

    Sprint.findById(req.params.id)
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

    Sprint.findById(req.params.id)
        .then((obj)=>{
            obj.name = req.body.name ? req.body.name : obj.name;
            obj.type = req.body.type ? req.body.type : obj.type;
            obj.project = req.body.project ? req.body.project : obj.project;
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

    Sprint.remove({_id: req.params.id})
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

function sprints(req, res, next){
    let project = req.params.id;

    const options = {
        page: 1,
        limit: 30,
        select: '_projectName _projectRequestDate _projectStartDate _projectDescription _projectManager _productOwner _developerTeam'
    }

    Sprint.find({_project : project }, (err, sprints)=>{
        UserStory.find({} ,(err, userStories)=>{
            res.render('sprints', {
                sprints : sprints,
                userStories: userStories,
                title: 'Scizza | Tablero',
                username: req.user,
                projectId: project,
            });
        });
        //res.status(200).send(objs);
    }).catch((err)=>{
        res.status(500).json({
            errors: [{message: 'Algo salió mal :c'}],
            data: []
        });
    });


}

module.exports = {
    create,
    listOne,
    listAll,
    update,
    destroy,
    sprints
}
