const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const cartModController = require('../controllers/cartModController');

router.post("/create", cartModController.createOrder);
router.post("/add", cartModController.addProductToOrder);

router.get('/table/:id_table', cartController.getOrderByTable);
router.get('/detail/:id_pedido', cartController.getOrderDetailByOrderId);
router.get('/all', cartController.getAllOrders);
router.get('/:id_pedido', cartController.getCartInfo);

router.put('/update/order', cartModController.updateOrderStatus);
router.put('/updateUnit', cartModController.updateOrderDetail);
router.put('/putProductsAsOld', cartModController.putProductsAsOld);

router.delete('/item/:id_detalle', cartModController.removeCartItem);
router.delete('/order/:id_pedido', cartModController.removeOrder);



module.exports = router;