const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const schema = Schema({
  _id: ObjectId,
  _teamName: String
});

class DeveloperTeam{
  constructor(id, teamName){
    this._id = id;
    this._teamName = teamName;
  }

  get id(){
    return this._id;
  }

  set id(v){
    this._id = v;
  }

  get teamName(){
    return this._teamName;
  }

  set teamName(v){
    this._teamName = v;
  }

}

schema.plugin(mongoosePaginate);
schema.loadClass(DeveloperTeam);
module.exports = mongoose.model('DeveloperTeam', schema);
