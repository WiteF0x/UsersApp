const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = Schema({
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userInfo: {
    type: String,
    default: '',
  },
  userTypes: {
    type: Array,
    default: ['defaultUser'],
  },
  dateOfRegistration: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Users', UsersSchema);