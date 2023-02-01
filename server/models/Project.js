const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  repository: {
    type: String,
  },
  url: {
    type: String,
  },
  type: {
    type: String,
    enum: ['static web', 'ecommerce', 'app', 'design', 'other'],
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  technologies: { type: [String]},
  createdAt: {type:Date, default: Date.now, require: true}
});

module.exports = mongoose.model('Project', ProjectSchema);