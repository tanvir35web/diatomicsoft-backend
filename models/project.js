const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

  coverImageURL: {
    type: String,
    default: null,
    required: false,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ['active', 'inactive', 'completed'],
    default: 'completed',
  },

  usedTechnology: {
    type: [String],
    required: true,
  },

  targetedPlatform: {
    type: [String],
    required: true,
  }

}, { timestamps: true });

const Project = mongoose.model("project", projectSchema);

module.exports = Project;