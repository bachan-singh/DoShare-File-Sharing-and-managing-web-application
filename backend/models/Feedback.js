// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  feedback: String
});

const Feedback = mongoose.model('feedbacks', feedbackSchema);

module.exports = Feedback;
