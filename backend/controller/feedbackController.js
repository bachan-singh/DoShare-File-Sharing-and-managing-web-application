// controllers/feedbackController.js
const feedbackService = require('../service/feedbackService');

async function submitFeedback(req, res) {
  try {
    const newFeedback = await feedbackService.submitFeedback(req.body);
    res.json(newFeedback);
  } catch (err) {
    console.error('Error submitting feedback:', err);
    res.status(500).json({ error: 'An error occurred while submitting feedback' });
  }
}


async function getAllFeedbacks(req, res) {
  try {
    const feedbacks = await feedbackService.getFeedbacks();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteFeedback(req, res) {
  const { id } = req.params;
  try {
    await feedbackService.deleteFeedbackById(id);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function getTotalFeedbacksCount(req, res){
  try {
    const count = await feedbackService.getTotalFeedbacksCount();
    res.json({ totalFeedbacks: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  submitFeedback,
  getAllFeedbacks,
  deleteFeedback,
  getTotalFeedbacksCount
};
