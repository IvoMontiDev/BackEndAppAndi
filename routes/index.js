const express = require('express');
const router = express.Router();

const menuRoutes = require('./menuRoutes');
const cartRoutes = require('./cartRoutes');


router.use('/menu', menuRoutes);
router.use('/cart', cartRoutes);


module.exports = router;
