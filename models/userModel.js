const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 30,
  },
  gmail: {
    type: String,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  age: {
    type: Number,
    min: 18,
    required: true,
  },
  crime: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: 'USER',
  }
}, { timestamps: true, versionKey: false }); // Auto adds createdAt & updatedAt

module.exports = mongoose.model('User', userSchema);