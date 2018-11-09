const router = require('express').Router();
const userRoutes = require('./User');

router.use('/users', userRoutes);

module.exports = router;