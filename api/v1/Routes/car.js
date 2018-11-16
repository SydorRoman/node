const express = require('express');

const app = express();
const carController = require('../controllers/carControllers/car');
const middlewares = require('../middlewares/index');


/**
 * @api {get} /cars Request Car Information
 * @apiName GetCars
 * @apiGroup Car
 * 
 * @apiSuccess {String} _id Id of the Car
 * @apiSuccess {String} model Model of the Car
 * 
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *   {
 *      "id" : 1,
 *      "model" : "AUDI"    
 *   }
 * @apiErrorExample {json} Car not found
 *    HTTP/1.1 404 Not Found
 */
app.get('/', carController.getAllCars);

module.exports = app;