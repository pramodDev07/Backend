const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  userType: {
    type: String,
    enum: ['guest', 'host'],
    required: [true, "User type is required"],
    default: 'guest',
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
    // required: true,
    // unique: true,
  }]
});

module.exports = mongoose.model('User', userSchema);