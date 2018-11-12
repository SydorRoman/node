const express = require('express');
const app = express();
const ProductController = require('../Controllers/productControllers/ProductContoller');
const middleWares = require('../Middlewares/index');

app.get('/',middleWares.modules.verifyToken.modules.verifyToken,ProductController.getProducts);
app.post('/',middleWares.modules.verifyToken.modules.verifyToken,ProductController.addProduct);
app.delete('/:id',middleWares.modules.verifyToken.modules.verifyToken,ProductController.deleteProduct);
app.put('/:id', middleWares.modules.verifyToken.modules.verifyToken, ProductController.editProduct);

module.exports = app;