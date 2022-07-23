var mongoose = require('mongoose');

// User Schema
var UserSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,  
  },
  name: {
    type: String,
  }
});

module.exports = {
  User: mongoose.model('User', UserSchema),
}