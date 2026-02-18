const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/', ticketController.createTicket);
router.get('/', ticketController.getAllTickets);
router.get('/count/pending', ticketController.getPendingCount);
router.get('/user/:user_id', ticketController.getUserTickets);
router.put('/:id/reply', ticketController.markAsReplied);

module.exports = router;
