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
    match: [/^\S+@\S+\.com/, 'Please enter a valid email address'],
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
}, { timestamps: true, versionKey: false, strict: 'throw' }); // Auto adds createdAt & updatedAt

// Throw error if crime or role is set manually on creation
userSchema.pre('validate', function (next) {
  if (this.isNew) {
    if (this.crime !== undefined && this.crime !== 0) {
      return next(new Error('Setting crime manually is not allowed'));
    }
    if (this.role !== undefined && this.role !== 'USER') {
      return next(new Error('Setting role manually is not allowed'));
    }
  }
  next();
});

module.exports = mongoose.model('User', userSchema);