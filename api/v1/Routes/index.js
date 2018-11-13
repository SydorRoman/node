const router = require('express').Router();
const userRoutes = require('../routes/user');
const productRoutes = require('../routes/product');

router.use('/users', userRoutes);
router.use('/products', productRoutes);

module.exports = router;
