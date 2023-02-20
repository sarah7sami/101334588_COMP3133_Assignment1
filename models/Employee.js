const { model, Schema } = require('mongoose');
const { isEmail } = require('validator');

const employeeSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  gender: {
    type: String,
    trim: true,
    maxlength: 25,
    enum: ['male', 'female', 'other']
  },
  salary: {
    type: Number,
    required: true,
    default: 0,
    validate: {
      validator: (value) => value >= 0,
      message: "Negative salaries aren't allowed."
    }
  }
}, {
  collection: 'employees' // Name of the collection
});

module.exports = model('Employee', employeeSchema);