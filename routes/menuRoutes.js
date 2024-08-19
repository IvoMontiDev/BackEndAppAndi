const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/', menuController.getAllProducts);
router.get('/:id', menuController.getProductById);
router.post('/', menuController.createProduct);
router.put('/:id', menuController.updateProduct);
router.delete('/:id', menuController.deleteProduct);

module.exports = router;
