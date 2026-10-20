const express = require('express');
const router = express.Router();
const hardwareController = require('../controllers/hardwareController');

router.get('/', hardwareController.getHardware);
router.get('/:id/image/:index', hardwareController.getHardwareImage);
router.post('/', hardwareController.createHardware);
router.put('/:id', hardwareController.updateHardware);
router.delete('/:id', hardwareController.deleteHardware);

module.exports = router;

