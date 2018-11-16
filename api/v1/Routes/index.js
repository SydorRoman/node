const router = require('express').Router();
const userRoutes = require('../routes/user');
const productRoutes = require('../routes/product');
const carRoutes = require('../routes/car');

router.use('/users', userRoutes)
  .use('/products', productRoutes)
  .use('/cars', carRoutes);

module.exports = router;
