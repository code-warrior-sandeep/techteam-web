const mongoose = require('mongoose');

const upcomingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: Date, required: true },
  subject: { type: String, required: true }
});

module.exports = mongoose.model('UpcomingEvent', upcomingSchema);
