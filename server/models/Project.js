import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  repository: {
    type: String,
  },
  url: {
    type: String,
  },
  type: {
    type: String,
    require: true,
    enum: ['static web', 'ecommerce', 'app', 'design', 'other'],
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
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