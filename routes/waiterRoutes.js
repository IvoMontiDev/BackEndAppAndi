const express = require('express');
const router = express.Router();
const waiterController = require('../controllers/waiterController');

router.get('/all', waiterController.getAllWaiters);

router.post('/create', waiterController.createWaiter);

router.put('/call', waiterController.callWaiter); // Llamar a un mozo
router.put('/requestBill', waiterController.requestBill); // Solicitar la cuenta
router.put('/resetNotifications', waiterController.updateNotifications); // Resetear notificaciones
router.put('/update', waiterController.updateWaiter);


module.exports = router;