import mongoose from 'mongoose';

const KanbanColumnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KanbanBoard',
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  category: {
    type: String,
  }
},{ timestamps: true });

export default mongoose.model('KanbanColumn', KanbanColumnSchema);