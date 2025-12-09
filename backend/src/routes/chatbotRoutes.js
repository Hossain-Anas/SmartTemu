const express = require('express');
const router = express.Router();

const { handleChatbotMessage } = require('../controllers/chatbotController');

// POST /api/chatbot/message - Send a message to the chatbot
router.post('/message', handleChatbotMessage);

module.exports = router;

