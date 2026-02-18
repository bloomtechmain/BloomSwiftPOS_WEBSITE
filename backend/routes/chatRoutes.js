const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/send', chatController.sendMessage);
router.get('/conversations', chatController.getConversations);
router.get('/history/:username', chatController.getHistory);
router.put('/read/:conversation_id', chatController.markAsRead);
router.get('/unread-count', chatController.getUnreadCount);

module.exports = router;
