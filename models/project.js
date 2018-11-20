const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
require('../models/developerTeam');
require('../models/developerMember');
const DeveloperTeam = mongoose.model('DeveloperTeam');
const DeveloperMember = mongoose.model('DeveloperMember');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const schema = Schema({
  _id: ObjectId,
  _projectName: String,
  _projectRequestDate: { type: Date },
  _projectStartDate: { type: Date },
  _projectDescription: String,
  _projectManager: { type: ObjectId, ref: 'DeveloperMember' },
  _productOwner: { type: ObjectId, ref: 'DeveloperMember' },
  _developerTeam: { type: ObjectId, ref: 'DeveloperTeam' }
});

class Project{
  constructor(id, projectName, projectRequestDate, projectStartDate,
    projectDescription, projectManager, productOwner, developerTeam){
    this._id = id;
    this._projectName = projectName;
    this._projectRequestDate = projectRequestDate;
    this._projectStartDate = projectStartDate;
    this._projectDescription = projectDescription;
    this._projectManager = projectManager;
    this._productOwner = productOwner;
    this._developerTeam = developerTeam;
  }

  get id(){
    return this._id;
  }

  set id(v){
    this._id = v;
  }

  get projectName(){
    return this._projectName;
  }

  set projectName(v){
    this._projectName = v;
  }

  get projectRequestDate(){
    return this._projectRequestDate;
  }

  set projectRequestDate(v){
    this._projectRequestDate = v;
  }

  get projectStartDate(){
    return this._projectStartDate;
  }

  set projectStartDate(v){
    this._projectStartDate = v;
  }

  get projectDescription(){
    return this._projectDescription;
  }

  set projectDescription(v){
    this._projectDescription = v;
  }

  get projectManager(){
    return this._projectManager;
  }

  set projectManager(v){
    this._projectManager = v;
  }

  get productOwner(){
    return this._productOwner;
  }

  set productOwner(v){
    this._productOwner = v;
  }

  get developerTeam(){
    return this._developerTeam;
  }

  set developerTeam(v){
    this._developerTeam = v;
  }

}

schema.plugin(mongoosePaginate);
schema.loadClass(Project);
module.exports = mongoose.model('Project', schema);
