const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

router.post('/', registrationController.createRegistration);
router.get('/stats', registrationController.getUserStats);
router.get('/project-requests', registrationController.getProjectRequests);
router.get('/users', registrationController.getAllUsers);
router.put('/users/:id', registrationController.updateUser);
router.delete('/users/:id', registrationController.deleteUser);

module.exports = router;
