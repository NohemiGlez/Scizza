const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const schema = Schema({
    _id: ObjectId,
    _backlogId: String,
    _asRole: String,
    _want: String,
    _soThat: String,
    _priority: Number,
    _size: Number,
    _given: String,
    _when: String,
    _then: String
});

class Card{

    constructor(id, backlogId, asRole, want, soThat, priority, size, given, when, then) {
        this._id = id;
        this._backlogId = backlogId;
        this._asRole = asRole;
        this._want = want;
        this._soThat = soThat;
        this._size = size;
        this._given = given;
        this._when = when;
        this._then = then;
        this._priority = priority;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get backlogId() {
        return this._backlogId;
    }

    set backlogId(value) {
        this._backlogId = value;
    }

    get asRole() {
        return this._asRole;
    }

    set asRole(value) {
        this._asRole = value;
    }

    get want() {
        return this._want;
    }

    set want(value) {
        this._want = value;
    }

    get soThat() {
        return this._soThat;
    }

    set soThat(value) {
        this._soThat = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    get given() {
        return this._given;
    }

    set given(value) {
        this._given = value;
    }

    get when() {
        return this._when;
    }

    set when(value) {
        this._when = value;
    }

    get then() {
        return this._then;
    }

    set then(value) {
        this._then = value;
    }
}

schema.plugin(mongoosePaginate);
schema.loadClass(Card);
module.exports = mongoose.model('Card', schema);
