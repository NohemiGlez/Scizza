const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
require('../models/project');

const Project = mongoose.model('Project');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const schema = Schema({
    _id: ObjectId,
    _name: String,
    _type: String,
    _project: { type: String, ref: 'Project'}
});

class Sprint{

    constructor(id, name, type, project) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._project = project;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get project() {
        return this._project;
    }

    set project(value) {
        this._project = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
}

schema.plugin(mongoosePaginate);
schema.loadClass(Sprint);
module.exports = mongoose.model('Sprint', schema);
