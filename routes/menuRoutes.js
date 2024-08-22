const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const modMenuController = require('../controllers/modMenuController');

router.get('/', menuController.getAllProducts);
router.get('/:id', menuController.getProductById);
router.post('/', modMenuController.createProduct);
router.put('/:id', modMenuController.updateProduct);
router.delete('/:id', modMenuController.deleteProduct);
router.post('/categories', modMenuController.createCategory);
router.delete('/categories/:id', modMenuController.deleteCategory);

module.exports = router;
