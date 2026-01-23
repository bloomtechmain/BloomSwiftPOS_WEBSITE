const express = require('express');
const router = express.Router();
const hardwareController = require('../controllers/hardwareController');

router.get('/', hardwareController.getHardware);
router.post('/', hardwareController.createHardware);

module.exports = router;

