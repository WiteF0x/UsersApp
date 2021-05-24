const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    default: 'Low',
  },
  assignedTo: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  endedAt: {
    type: Date,
    default: Date.now,
  },
  project: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  // userName: {
  //   type: String,
  //   required: true,
  // },
  // firstName: {
  //   type: String,
  //   required: true,
  // },
  // lastName: {
  //   type: String,
  //   required: true,
  // },
  // login: {
  //   type: String,
  //   required: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },
  // userInfo: {
  //   type: String,
  //   default: '',
  // },
  // userTypes: {
  //   type: Array,
  //   default: ['defaultUser'],
  // },
  // dateOfRegistration: {
  //   type: Date,
  //   default: Date.now,
  // }
});

module.exports = mongoose.model('Tasks', TasksSchema);