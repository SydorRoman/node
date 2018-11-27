const express = require('express');

const app = express();
const carController = require('../controllers/carControllers/car');
const middleWares = require('../middlewares/index');


//--------------CARS-----------

/**
 * @api {get} http://localhost:8080/api/v1/cars Request Car Information
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


/**
 * @api {get} http://localhost:8080/api/v1/cars/all Get all Cars of User
 * @apiName get get user`s cars
 * @apiGroup  Car
 * 
 * @apiSuccess {String} _id Id of the Car
 * @apiSuccess {String} model Model of the Car
 * 
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *   {
 *      "id" : 2,
 *      "model" : "AUDI"    
 *   }
 * 
 * @apiErrorExample {json} Task not founds
 *    HTTP/1.1 404 Not Found 
 */
app.get('/all', middleWares.verifyToken, carController.getUserCars);

/**
 * @api {post} http://localhost:8080/api/v1/cars/add/:id Add Car for USer
 * @apiName post add car for User
 * @apiGroup Car
 * @apiParam {id} id Id of reference between user and car
 * 
 * @apiSuccess {String} _id Id of reference between user and car
 * @apiSuccess {String} userID User id
 * @apiSuccess {String} carId Car id
 * 
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 ok
 *    {
 *      "_id" :"237462g6372fg",
 *      "userId": "89yucsdjh23",
 *      "carId": "fdsofbj"  
 *    }
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found 
 */
app.post('/add/:id', middleWares.verifyToken, carController.addCarToUser);



/**
 * @api {get} http://localhost:8080/api/v1/cars/one/:id Get one car of User
 * @apiName get user`s car
 * @apiGroup  Car
 * @apiParam {id} id Id of reference between user and car
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
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found  
 *
 */
app.get('/one/:id', middleWares.verifyToken, carController.getUserCar);


/**
 * @api {delete} http://localhost:8080/api/v1/cars/remove/:id Remove car from user
 * @apiName delete user`s car
 * @apiGroup Car
 * @apiParam {id} id Id of reference between user and car
 * 
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *   {
 *      "messege": "deleted successfully"
 *   }
 * 
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found 
 */
app.delete('/remove/:id', middleWares.verifyToken, carController.deleteCarFromUser);


//                        ***  ADMIN  ***



/**
 * @api {post} http://localhost:8080/api/v1/cars Create car
 * @apiName post create car
 * @apiGroup Car
 * 
 * @apiSuccess {String} _id
 * @apiSuccess {String} model
 * 
 * apiSuccessExample {json} Success
 *  HTTP/1.1 20 ok
 *   {
 *      "_id": "23432dfg"
 *      "model": "TOYOTA"
 *   }
 */
app.post('/', middleWares.verifyRole, middleWares.verifyToken, carController.createCar)

/**
 * @api {put} http://localhost:8080/api/v1/cars/:id Update car
 * @apiName post update car
 * @apiGroup Car
 * 
 * @apiParam {id} id Car id
 * 
 * @apiParamExample {json} Input
 * {
 *     "Model": "Toyota"
 * }
 * 
 * @apiSuccess {String} _id
 * @apiSuccess {String} model
 * 
 * apiSuccessExample {json} Success
 *  HTTP/1.1 20 ok
 *   {
 *      "_id": "23432dfg"
 *      "model": "Toyota"
 *   }
 */
app.put('/:id', middleWares.verifyRole, middleWares.verifyToken, carController.updateCar)


/**
 @api {delete} http://localhost:8080/api/v1/cars/:id Delete Car
 * @apiName Delete Car
 * @apiGroup Car
 * 
 * @apiParam {id} id Car id
 * 
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 ok
 *   {
 *      "messege" : Deleted successfully
 *   }
 * @apiErrorExample {json} Car not found
 *    HTTP/1.1 404 Not Found 
 */
app.delete('/:id', middleWares.verifyRole, middleWares.verifyToken, carController.deleteCar)

/**
 * @api {get} http://localhost:8080/api/v1/cars/admin/cars/:id Request All Users of Car (Admin)
 * @apiName GetUsersofCar
 * @apiGroup Car
 * 
 * @apiParam {id} id Id of cars 
 *
 * @apiSuccess {String} _id ID of the User
 * @apiSuccess {String} name Name of the User
 * @apiSuccess {String} email Email of the User
 * @apiSuccess {String} phone Phone of the User
 * @apiSuccess {Date} dateOfBirth Bith Date of the User
 * @apiSuccess {String} about Inforamtion about User
 * @apiSuccess {String} password Password about User 
 * 
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 ok
 * {
 *    "id" : 1,
 *    "name" : "Kate"
 *    "email" : "kateRAW@gmail.com",
 *    "phone" : "(063)245-4444",
 *    "dateOfBirth" : "(063)245-4444",
 *    "about" : "Student...etc",
 *    "password" : "gsdyTv32khjs324da"
 * }
 */
app.get('/admin/cars/:id', middleWares.verifyRole, middleWares.verifyToken, carController.getAllUsersOfCar );

/**
 * @api {get} http://localhost:8080/api/v1/cars/admin/users/:id Request All Cars of User (Admin)
 * @apiName GetCarsOfUser
 * @apiGroup Car
 * 
 * @apiParam {id} id Id of user
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} model
 * 
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 20 ok
 *   {
 *      "_id": "23432dfg"
 *      "model": "Toyota"
 *   }
 */
app.get('/admin/users/:id', middleWares.verifyRole, middleWares.verifyToken, carController.getAnyUserCars);


/**
 * @api {post} http://localhost:8080/api/v1/cars/:userId/cars/:carId Add Car to User (Admin)
 * @apiName AddCarToUser
 * @apiGroup Car
 * 
 * @apiParam {userID} userID Id of user
 * @apiParam {carId} carId Id of car
 *
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 20 ok
 *   {
 *     "messege" : "success"
 *   }
 */
app.post('/:userId/cars/:carId', middleWares.verifyRole, middleWares.verifyToken, carController.addCarToUserAdmin);

/**
 * @api {delete} http://localhost:8080/api/v1/cars/:userId/cars/:carId Remove Car from User (Admin)
 * @apiName RemoveCarFromUser
 * @apiGroup Car
 * 
 * @apiParam {userID} userID Id of user
 * @apiParam {carId} carId Id of car
 *
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 20 ok
 *   {
 *     "messege" : "deleted successfully"
 *   }
 */
app.delete('/:userId/cars/:carId', middleWares.verifyRole, middleWares.verifyToken, carController.deleteCarFromUserAdmin);

module.exports = app;
