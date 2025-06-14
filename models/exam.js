const mongoose = require('mongoose');

const importantDateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  labelColor: { type: String, default: 'gray' }
}, {
  timestamps: true
});

module.exports = mongoose.model('ImportantDate', importantDateSchema);
