const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const schema = Schema({
  _id: ObjectId,
  _role: String
});

class Role{
  constructor(id, role){
    this._id = id;
    this._role = role;
  }

  get id(){
    return this._id;
  }

  set id(v){
    this._id = v;
  }

  get role(){
    return this._role;
  }

  set role(v){
    this._role = v;
  }

}

schema.plugin(mongoosePaginate);
schema.loadClass(Role);
module.exports = mongoose.model('Role', schema);
