const mongoose = require('mongoose');

const studentListSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('StudentList', studentListSchema); 