const express = require('express');
const UserStory = require('../models/userStory');
const Sprint = require('../models/sprint');
const {validationResult} = require('express-validator/check');
const ObjectID = require('mongodb').ObjectID;

function create(req, res, next) {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors:errors.array()
        });
    }

    let userStory = new UserStory({
        _id : req.body.id ? req.body.id : new ObjectID(),
        _backlogId: req.body.backlogId,
        _name: req.body.name,
        _asRole: req.body.asRole,
        _want: req.body.want,
        _soThat: req.body.soThat,
        _priority: req.body.priority,
        _size: req.body.size,
        _timeUnit: req.body.timeUnit,
        _given: req.body.given,
        _when: req.body.when,
        _then: req.body.then,
        _remainingTime: req.body.remainingTime,
        _validated: req.body.validated ? req.body.validated : false
    });

    userStory.save()
        .then((obj)=>{
            res.status(200).json({
                errors: [],
                data: obj
            });
        })
        .catch((err)=>{
            return res.status(500).json({
                errors:[{message: 'Algo salió mal :c'}],
                data:[]
            });
        });

}

function createPendingRevision(req, res, next) {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors:errors.array()
        });
    }

    let userStory;
//AQUI 'esta consulta no jala  requiero que el _backlogId reciba elID del sprint que corresponde al product backlog
    Sprint.find({_project : req.body.projectId, _type : "productBacklog"}, (err, sprint)=>{
        userStory = new UserStory({
            _id : req.body.id ? req.body.id : new ObjectID(),
            _backlogId: sprint,
            _name: req.body.name,
            _asRole: req.body.asRole,
            _want: req.body.want,
            _soThat: req.body.soThat,
            _priority: req.body.priority,
            _size: req.body.size,
            _timeUnit: req.body.timeUnit,
            _given: req.body.given,
            _when: req.body.when,
            _then: req.body.then,
            _remainingTime: req.body.remainingTime,
            _validated: req.body.validated ? req.body.validated : false
        });

        userStory.save()
            .then((obj)=>{
                res.status(200).json({
                    errors: [],
                    data: obj
                });
            })
            .catch((err)=>{
                return res.status(500).json({
                    errors:[{message: 'Algo salió mal :c'}],
                    data:[]
                });
            });
    }).catch((err)=> {
        res.status(500).json({
            errors: [{message: 'Algo salió mal :c'}],
            data: []
        });
    });



}


function listAll(req, res, next) {

    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: 1,
        limit: 100
        //select: '_backlogId _asRole _want _soThat _priority _size _given _when _then'
    }

    UserStory.paginate({}, options)
        .then((objs)=>{
            res.status(200).json({
                errors:[],
                data: objs
            });
        }).catch((err)=>{
            res.status(500).json({
                errors: [{message: 'Algo salio mal :c'}],
                data: []
            });
    });

}

function listOne(req, res, next) {

    UserStory.findById(req.params.id)
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

    UserStory.findById(req.params.id)
        .then((obj)=>{
            obj.backlogId = req.body.backlogId ? req.body.backlogId : obj.backlogId;
            obj.name = req.body.name ? req.body.name : obj.name;
            obj.asRole  = req.body.asRole ? req.body.asRole : obj.asRole;
            obj.want = req.body.want ? req.body.want : obj.want;
            obj.soThat  = req.body.soThat ? req.body.soThat : obj.soThat;
            obj.priority = req.body.priority ? req.body.priority : obj.priority;
            obj.size  = req.body.size ? req.body.size : obj.size;
            obj.timeUnit = req.body.timeUnit ? req.body.timeUnit : obj.timeUnit;
            obj.given = req.body.given ? req.body.given : obj.given;
            obj.when = req.body.when ? req.body.when : obj.when;
            obj.then = req.body.then ? req.body.then : obj.then;
            obj.remainingTime = req.body.remainingTime ? req.body.remainingTime : obj.remainingTime;
            obj.validated = req.body.validated ? req.body.validated : obj.validated;
            obj.save()
                .then((obj)=>{
                    res.status(200).json({
                        errors: [],
                        data: obj
                    });
                })
                .catch((err)=>{
                    res.status(500).json({
                        errors: [{message: 'Algo salió  mal :c'}],
                        data: []
                    });
                });
        })
}

function destroy(req, res, next) {

    UserStory.remove({_id: req.params.id})
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
    createPendingRevision,
    listOne,
    listAll,
    update,
    destroy
}
