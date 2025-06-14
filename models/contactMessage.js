const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  senderName: {
    type: String,
    required: true
  },
  senderEmail: {
    type: String,
    required: true
  },
  problemSub: {
    type: String,
    required: true
  },
  problem: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("contactMessage", contactSchema);
