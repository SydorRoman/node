const express = require('express');

const app = express();
const ProductController = require('../controllers/productControllers/product');
const middleWares = require('../middlewares/index');

app.get('/', middleWares.modules.verifyToken.modules.verifyToken, ProductController.getProducts);
app.post('/', middleWares.modules.verifyToken.modules.verifyToken, ProductController.addProduct);
app.delete('/:id', middleWares.modules.verifyToken.modules.verifyToken, ProductController.deleteProduct);
app.put('/:id', middleWares.modules.verifyToken.modules.verifyToken, ProductController.editProduct);
app.get('/:id', middleWares.modules.verifyToken.modules.verifyToken, ProductController.getOneProduct);

module.exports = app;
