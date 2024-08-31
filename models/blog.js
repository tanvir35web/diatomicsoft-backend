const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({

  blogImage: {
    type: String,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  tags: {
    type: [String],
    required: true,
  },

}, { timestamps: true });

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;