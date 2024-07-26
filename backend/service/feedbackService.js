// services/feedbackService.js
const Feedback = require('../models/Feedback');

async function submitFeedback(feedbackData) {
  return await Feedback.create(feedbackData);
}

async function getFeedbacks() {
  return await Feedback.find();
}

async function deleteFeedbackById(id){
  try {
    await Feedback.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting feedback');
  }
};

async function getTotalFeedbacksCount(){
  try {
    const count = await Feedback.countDocuments();
    return count;
  } catch (error) {
    throw new Error('Error fetching total feedbacks count');
  }
};
module.exports = {
  submitFeedback,
  getFeedbacks,
  deleteFeedbackById,
  getTotalFeedbacksCount
};
