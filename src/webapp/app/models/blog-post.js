var mongoose = require('mongoose');

// set the data format for the object "post"
module.exports = mongoose.model('BlogPost', new mongoose.Schema({
  id: {type: String, lowercase: true, unique: true},
  title: String,
  author: String,
  body: String,
  date: {type: Date, default: Date.now},
  hidden: Boolean,
}));
