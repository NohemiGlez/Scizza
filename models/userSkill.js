const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
require('../models/developerMember');
const DeveloperMember = mongoose.model('DeveloperMember');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const schema = Schema({
  _id: ObjectId,
  _user: { type: ObjectId, ref: 'DeveloperMember' },
  _skill: String,
  _level: String
});

class UserSkill{
  constructor(id, user, skill, level){
    this._id = id;
    this._user = user;
    this._skill = skill;
    this._level = level;
  }

  get id(){
    return this._id;
  }

  set id(v){
    this._id = v;
  }

  get user(){
    return this._user;
  }

  set user(v){
    this._user = v;
  }

  get skill(){
    return this._skill;
  }

  set skill(v){
    this._skill = v;
  }

  get level(){
    return this._level;
  }

  set level(v){
    this._level = v;
  }

}

schema.plugin(mongoosePaginate);
schema.loadClass(UserSkill);
module.exports = mongoose.model('UserSkill', schema);
