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
  writer:{
    type: mongoose.Types.ObjectId,
  },
  likes: {
    type: Array,
    default: []
  }
});

module.exports = {
  Post: mongoose.model('Post', PostSchema),
}