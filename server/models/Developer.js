import mongoose from 'mongoose';

const DeveloperSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  position: {
    type: String,
  },
  createdAt: {type:Date, default: Date.now, require: true}
});

export default mongoose.model('Developer', DeveloperSchema);