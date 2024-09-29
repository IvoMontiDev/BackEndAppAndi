const express = require('express');
const router = express.Router();
const waiterController = require('../controllers/waiterController');

router.post('/create', waiterController.createWaiter);
router.put('/update', waiterController.updateWaiter);

module.exports = router;