import mongoose from 'mongoose';

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
  team: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer',
  }],
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  tags: { type: [String]}
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);