const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
  },
  date: {type:Date, default: Date.now, require: true},
  createdAt: {type:Date, default: Date.now, require: true}
});

module.exports = mongoose.model('Task', TaskSchema);