const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const cartModController = require('../controllers/cartModController');

router.post("/create", cartModController.createOrder);
router.post("/add", cartModController.addProductToOrder);
router.get('/tables', cartController.getAllMesas);
router.get('/:id_pedido', cartController.getCartInfo);
router.put('/update/order', cartModController.updateOrderStatus);
router.put('/update/table', cartModController.updateTableStatus);
router.put('/update/o&t', cartModController.updateOrderAndTableStatus);
router.delete('/item/:id_detalle', cartModController.removeCartItem);
router.delete('/order/:id_pedido', cartModController.removeOrder);



module.exports = router;