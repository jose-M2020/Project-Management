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
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer'
  }]
},{ timestamps: true });

export default mongoose.model('KanbanBoard', KanbanBoardSchema);