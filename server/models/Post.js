// Imports
const mongoose = require('mongoose');

// Define the Post schema
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

// Converts a doc to something we can store in redis later on.
PostSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  body: doc.body,
  author: doc.author,
  background: doc.background,
  id: doc.id,
});

// Establish the Post model
const PostModel = mongoose.model('Post', PostSchema);

// Exports
module.exports = PostModel;
