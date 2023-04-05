import mongoose from 'mongoose';

const KanbanColumnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KanbanBoard',
    required: true
  },
  order: {
    type: Number,
    required: true
  }
},{ timestamps: true });

export default mongoose.model('KanbanColumn', KanbanColumnSchema);