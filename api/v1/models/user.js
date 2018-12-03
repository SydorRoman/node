const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
// var Schema = mongoose.Schema;

const userScheme = new Schema({

  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  phone: {
    type: String,
    match: /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/,
  },
  dateOfBirth: {
    type: Date,
    match: /^\d{4}\-\d{1,2}\-\d{1,2}$/,
  },
  about: {
    type: String,
    maxlength: 300,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'USER'
  },
  isBanned: {
    type: Boolean,
    default: false
  }
}, {
  timestamps : true,
});

userScheme.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userScheme);