import mongoose from 'mongoose';

const KanbanBoardSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Untitled',
    required: true
  },
  description: {
    type: String,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
},{ timestamps: true });

export default mongoose.model('KanbanBoard', KanbanBoardSchema);