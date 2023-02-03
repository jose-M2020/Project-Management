import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
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
  date: {type:Date, default: Date.now, require: true},
  notify: {type:Boolean, default: false},
  createdAt: {type:Date, default: Date.now, require: true}
});

export default mongoose.model('Event', EventSchema);