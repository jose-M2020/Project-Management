import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
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
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer',
  }],
  date: {type:Date}
}, { timestamps: true });

export default mongoose.model('Task', TaskSchema);