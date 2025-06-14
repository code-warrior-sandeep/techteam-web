const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

   username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },

  semester: {
    type: String,
    required: true,
  },

  image: {
          filename: String,
          url: String,
  },

  roles: {
    type: [String],
    enum: ['user', 'admin'],
    default: ['user'],
  },
}, { timestamps: true });

studentSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Student', studentSchema);
