const express = require('express');
const router = express.Router();

const menuRoutes = require('./menuRoutes');
const cartRoutes = require('./cartRoutes');
const tableRoutes = require('./tableRoutes')


router.use('/menu', menuRoutes);
router.use('/cart', cartRoutes);
router.use('/table', tableRoutes);


module.exports = router;
