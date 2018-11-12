const router = require('express').Router();
const userRoutes = require('./User');
const productRoutes = require('./productRoutes');


router.use('/users', userRoutes);
router.use('/products',productRoutes);

module.exports = router;