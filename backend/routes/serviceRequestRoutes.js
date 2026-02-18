const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controllers/serviceRequestController');

router.post('/', serviceRequestController.createServiceRequest);
router.get('/user/:userId', serviceRequestController.getUserServiceRequests);
router.get('/count/pending', serviceRequestController.getPendingCount);
router.put('/:id/reply', serviceRequestController.markAsReplied);

module.exports = router;

