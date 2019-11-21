const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersTypesSchema = Schema({
  typeTitle: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('UsersTypes', UsersTypesSchema);