const express = require('express');
const router = express.Router();

const menuRoutes = require('./menuRoutes');
const cartRoutes = require('./cartRoutes');
const tableRoutes = require('./tableRoutes');
const waiterRoutes = require('./waiterRoutes');


router.use('/menu', menuRoutes);
router.use('/cart', cartRoutes);
router.use('/table', tableRoutes);
router.use('/waiter', waiterRoutes);


module.exports = router;
