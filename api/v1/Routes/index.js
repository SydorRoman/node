const router = require('express').Router();
const userRoutes = require('../routes/user');
const productRoutes = require('../routes/product');
const carRoutes = require('../routes/car');
const authRoutes = require('../routes/auth')

router.use('/users', userRoutes)
  .use('/products', productRoutes)
  .use('/cars', carRoutes)
  .use('/auth', authRoutes);

module.exports = router;
