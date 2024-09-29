const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.get('/all', tableController.getAllTables);
router.put('/update/table/waiter', tableController.updateTableWaiter);
router.put('/update/table', tableController.updateTableStatus);
router.put('/update/o&t', tableController.updateOrderAndTableStatus);
router.get('/user/:id', tableController.getUserAndPasswByTable)
router.put('/update/info', tableController.updateTableInfo)
router.post('/create', tableController.createTable);

module.exports = router;    
