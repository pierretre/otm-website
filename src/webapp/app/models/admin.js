var mongoose = require('mongoose');

// set the data format for the object "user"
module.exports = mongoose.model('Admin', new mongoose.Schema({
  // _id: {type: Number, required: true, unique: true, default: 1},
  username: {type: String, lowercase: true, required: true, unique: true},
  email: {type: String, lowercase: true, required: true, unique: true},
  password: {type: String, required: true}
}, {
  timestamps: true
}));
