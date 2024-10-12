const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const modMenuController = require('../controllers/modMenuController');

router.get('/', menuController.getAllProducts);
router.get('/cat', menuController.getAllCategories);
router.get('/:id', menuController.getProductById);
router.get('/subcat/:id', menuController.getSubCategoriesByCategoryId);

router.post('/', modMenuController.createProduct);
router.post('/categories', modMenuController.createCategory);

router.put('/updateStock', modMenuController.updateStock);
router.put('/updatePlatoDelDia', modMenuController.updatePlatoDelDia);
router.put('/:id', modMenuController.updateProduct);

router.delete('/:id', modMenuController.deleteProduct);
router.delete('/categories/:id', modMenuController.deleteCategory);

module.exports = router;    
