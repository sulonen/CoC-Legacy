'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
  fullName: String,
  authentication: {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  admin: {
    type: Boolean,
    default: false
  },
  characterList: [
    {
      character: {
        type: Schema.Types.ObjectId,
        ref: 'Character'
      }
    }
  ]
});

userSchema.methods.hashPassword = function(password) {
  var hash
    = this.authentication.password
    = bcrypt.hashSync(password, 8);
  return hash;
};

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password,
    this.authentication.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({id: this._id, admin: this.admin}, 'CHANGEME');
};

module.exports = mongoose.model('Users', userSchema);

