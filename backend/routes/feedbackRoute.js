// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controller/FeedbackController');


router.get('/all-feedbacks', feedbackController.getAllFeedbacks);
router.post('/feedback', feedbackController.submitFeedback);
router.delete('/feedbacks/:id', feedbackController.deleteFeedback);
router.get('/total-feedbacks', feedbackController.getTotalFeedbacksCount);

module.exports = router;
