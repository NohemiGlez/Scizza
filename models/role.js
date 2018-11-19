const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const schema = Schema({
  _id: ObjectId,
  _roleName: String,
  _permission: Number
});

class Role{
  constructor(id, roleName, permission){
    this._id = id;
    this._roleName = roleName;
    this._permission = permission;
  }

  get id(){
    return this._id;
  }

  set id(v){
    this._id = v;
  }

  get roleName(){
    return this._roleName;
  }

  set roleName(v){
    this._roleName = v;
  }

  get permission(){
    return this._permission;
  }

  set permission(v){
    this._permission = v;
  }

}

schema.plugin(mongoosePaginate);
schema.loadClass(Role);
module.exports = mongoose.model('Role', schema);
