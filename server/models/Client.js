const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
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
    website: {type: String, required: true},
    country: {type: String, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true},
  },
  createdAt: {type:Date, default: Date.now, require: true}
});

module.exports = mongoose.model('Client', ClientSchema);