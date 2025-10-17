const mongoose = require('mongoose');

const todoItemSchema = mongoose.Schema({
  task: { type: String, required: true },
  date:  Date,
  completed: { type: Boolean, default: false }
}, {
  timestamps: true // This will add createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('TodoItem', todoItemSchema);
