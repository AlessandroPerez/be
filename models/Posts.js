const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  likes: {
    type: Array,
    default: []
  }
});

module.exports = {
  Post: mongoose.model('Post', PostSchema),
}