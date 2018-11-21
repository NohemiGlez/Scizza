const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
//require('../models/developerTeam');
//require('../models/role');
//const DeveloperTeam = mongoose.model('DeveloperTeam');
//const Role = mongoose.model('Role');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const schema = Schema({
  _id: ObjectId,
  _facebook_provider_id: String,
  _twitter_provider_id: String,
  _google_provider_id: String,
  _fullName: String,
  _birthDate: { type: Date },
  _curp: String,
  _rfc: String,
  _address: String,
  _team: String,
  _role: String,
  _permission: Number
});

class DeveloperMember{
  constructor(id, facebook_provider_id, twitter_provider_id,
  google_provider_id, fullName, birthDate, curp, rfc, address, team, role, permission){
    this._id = id;
    this._facebook_provider_id = facebook_provider_id;
    this._twitter_provider_id = twitter_provider_id;
    this._google_provider_id = google_provider_id;
    this._fullName = fullName;
    this._birthDate = birthDate;
    this._curp = curp;
    this._rfc = rfc;
    this._address = address;
    this._team = team;
    this._role = role;
    this._permission = permission;
  }

  get id(){
    return this._id;
  }

  set id(v){
    this._id = v;
  }

  get facebook_provider_id(){
    return this._facebook_provider_id;
  }

  set facebook_provider_id(v){
    this._facebook_provider_id = v;
  }

  get twitter_provider_id(){
    return this._twitter_provider_id;
  }

  set twitter_provider_id(v){
    this._twitter_provider_id = v;
  }

  get google_provider_id(){
    return this._google_provider_id;
  }

  set google_provider_id(v){
    this._google_provider_id = v;
  }

  get fullName(){
    return this._fullName;
  }

  set fullName(v){
    this._fullName = v;
  }

  get birthDate(){
    return this._birthDate;
  }

  set birthDate(v){
    this._birthDate = v;
  }

  get curp(){
    return this._curp;
  }

  set curp(v){
    this._curp = v;
  }

  get rfc(){
    return this._rfc;
  }

  set rfc(v){
    this._rfc = v;
  }

  get address(){
    return this._address;
  }

  set address(v){
    this._address = v;
  }

  get team(){
    return this._team;
  }

  set team(v){
    this._team = v;
  }

  get role(){
    return this._role;
  }

  set role(v){
    this._role = v;
  }

  get permission(){
    return this._permission;
  }

  set role(v){
    this._permission = v;
  }

}

schema.plugin(mongoosePaginate);
schema.loadClass(DeveloperMember);
module.exports = mongoose.model('DeveloperMember', schema);
