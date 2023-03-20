import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
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
  company: {
    name: {type: String, required: true},
    website: {type: String},
    country: {type: String, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true},
  }
},{ timestamps: true });

export default mongoose.model('Client', ClientSchema);