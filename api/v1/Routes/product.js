const express = require('express');

const app = express();
const ProductController = require('../controllers/productControllers/product');
const middleWares = require('../middlewares/index');

/**
 * @api {get} http://localhost:8080/api/v1/products Get all Products of User
 * @apiGroup Product
 * @apiName get Product
 *
 * @apiSuccess {String} _id ID of the Product
 * @apiSuccess {String} productName Name of the Product
 * @apiSuccess {Number} price Price of the Product
 * @apiSuccess {String} about Inforamtion about Product
 * @apiSuccess {String} userId UserId 
 * 
 * 
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 ok
 *    {
 *       "_id": "5beadb6f4eb66ea820b98b3d",
 *       "productName": "Apple",
 *       "price": 694,
 *       "about": "Fruit",
 *       "userId": "5beacbef75961da310d4d064",
 *    }
 * @apiErrorExample {json} Product not found
 *    HTTP/1.1 404 Not Found 
 * 
 */
app.get('/', middleWares.verifyToken, ProductController.getProducts);

/**
 * @api {post} http://localhost:8080/api/v1/products Create new product for User
 * @apiGroup Product
 * @apiName Post Product
 *
 * @apiParamExample {json} Input
 * {
 *   "productName" : "Apple"
 *   "price" : "44",
 *   "about" : "Student...etc",
 * }
 * 
 * @apiSuccess {String} _id ID of the Product
 * @apiSuccess {String} productName Name of the Product
 * @apiSuccess {Number} price Price of the Product
 * @apiSuccess {String} about Inforamtion about Product
 * @apiSuccess {String} userId UserId 
 * 
 * 
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 ok
 *    {
 *       "_id": "5beadb6f4eb66ea820b98b3d",
 *       "productName": "Apple",
 *       "price": 694,
 *       "about": "Fruit",
 *       "userId": "5beacbef75961da310d4d064",
 *    }
 * 
 */
app.post('/', middleWares.verifyToken, ProductController.addProduct);

/**
 * @api {delete} http://localhost:8080/api/v1/products/:id Delete Product of current User
 * @apiName Delete Product
 * @apiGroup Product
 * 
 * @apiParam {id} id Product id
 * 
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 ok
 *   {
 *      "messege" : Deleted successfully
 *   }
 * @apiErrorExample {json} Product not found
 *    HTTP/1.1 404 Not Found 
 */
app.delete('/:id', middleWares.verifyToken, ProductController.deleteProduct);

/**
 * @api {put} http://localhost:8080/api/v1/products/:id Update Product of current User
 * @apiName Put Product
 * @apiGroup Product
 * 
 * @apiParam {id} id Product id
 * 
 * @apiParamExample {json} Input
 * {
 *       "productName": "Apple",
 *       "price": 694,
 *       "about": "Fruit" 
 * }
 * 
 * 
 * @apiSuccess {String} _id ID of the Product
 * @apiSuccess {String} productName Name of the Product
 * @apiSuccess {Number} price Price of the Product
 * @apiSuccess {String} about Inforamtion about Product
 * @apiSuccess {String} userId UserId 
 * 
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 ok
 *    {
 *       "_id": "5beadb6f4eb66ea820b98b3d",
 *       "productName": "Apple",
 *       "price": 694,
 *       "about": "Fruit",
 *       "userId": "5beacbef75961da310d4d064"
 *    }
 * 
 * @apiErrorExample {json} Product not found
 *    HTTP/1.1 404 Not Found  
 */
app.put('/:id', middleWares.verifyToken, ProductController.editProduct);

/**
 * @api {get} http://localhost:8080/api/v1/products/:id Get Product of current User
 * @apiName Get Product
 * @apiGroup Product
 * 
 * @apiParam {id} id Product id
 * 
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 ok
 *   {
 *       "_id": "5beadb6f4eb66ea820b98b3d",
 *       "productName": "Apple",
 *       "price": 694,
 *       "about": "Fruit",
 *       "userId": "5beacbef75961da310d4d064"
 *   }
 * @apiErrorExample {json} Product not found
 *    HTTP/1.1 404 Not Found 
 */
app.get('/:id', middleWares.verifyToken, ProductController.getOneProduct);

module.exports = app;
