const express = require('express');
const Sprint = require('../../models/sprint');
const Project = require('../../models/project');
const {validationResult} = require('express-validator/check');
const ObjectID = require('mongodb').ObjectID;

exports.createProjectBoard = function(projectId){

    let productBacklog = new Sprint({
        _id: new ObjectID(),
        _name: "Product Backlog",
        _type: "productBacklog",
        _project: projectId
    });

    let releaseBacklog = new Sprint({
        _id: new ObjectID(),
        _name: "Release Backlog",
        _type: "releaseBacklog",
        _project: projectId
    });

    let sprint = new Sprint({
        _id: new ObjectID(),
        _name: "Sprint 1",
        _type: "sprint",
        _project: projectId
    });

    let done = new Sprint({
        _id: new ObjectID(),
        _name: "Done",
        _type: "done",
        _project: projectId
    });

    productBacklog.save()
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

    releaseBacklog.save()
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

    done.save()
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