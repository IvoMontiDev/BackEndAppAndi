const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.get('/all', tableController.getAllTables);
router.get('/user/:id', tableController.getUserAndPasswByTable);

router.put('/update/table/waiter', tableController.updateTableWaiter);
router.put('/update/table', tableController.updateTableStatus);
router.put('/update/o&t', tableController.updateOrderAndTableStatus);
router.put('/update/info', tableController.updateTableInfo);
router.put('/update/note', tableController.updateTableNote);

router.post('/create', tableController.createTable);

router.delete('/delete/note', tableController.deleteTableNote);

module.exports = router;    
