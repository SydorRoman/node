const express = require('express');

const app = express();
const UserController = require('../controllers/userControllers/user');
const middleWares = require('../middlewares/index');


/**
 * @api {get} http://localhost:8080/api/v1/users Request All User Infromation
 * @apiName GetUsers
 * @apiGroup User
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
 *   HTTP/1.1 200 ok
 *   {
 *      "id" : 1,
 *      "name" : "Kate"
 *      "email" : "kateRAW@gmail.com",
 *      "phone" : "(063)245-4444",
 *      "dateOfBirth" : "2019-12-12T00:00:00.000Z",
 *      "about" : "Student...etc",
 *      "password" : "gsdyTv32khjs324da"
 *   },
 *   {
 *    "id" : 2,
 *    "name" : "Ann"
 *    "email" : "annOCB@gmail.com",
 *    "phone" : "(063)234-4555",
 *    "dateOfBirth" : "2019-12-12T00:00:00.000Z",
 *    "about" : "Student...etc",
 *    "password" : "23sdfr7834da"
 *   }
 *
 *    @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 */
app.get('/', UserController.getAll);

/**
 * @api {get} http://localhost:8080/api/v1/users/:id Find a User
 * @apiGroup User
 * @apiName GetUser
 * @apiParam {id} id User id
 * 
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
app.get('/:id', UserController.getOne);




/**
 * @api {delete} http://localhost:8080/api/v1/users/:id Delete User
 * @apiGroup User 
 * @apiParam {id} id User id
 * @apiName DeleteUser
 * 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content 
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 */
app.delete('/:id', UserController.deleteUser);


/**
 * @api {put} http://localhost:8080/api/v1/users/:id Update User
 * @apiGroup User
 * @apiParam {id} id User id
 * @apiName User
 * 
 * @apiParamExample {json} Input
 *   {
 *      "name" : "Kate"
 *      "email" : "kateRAW@gmail.com",
 *      "phone" : "(063)245-4444",
 *      "dateOfBirth" : "2019-12-12T00:00:00.000Z",
 *      "about" : "Student...etc",   
 *   }
 * 
 * @apiSuccess {String} _id ID of the User
 * @apiSuccess {String} name Name of the User
 * @apiSuccess {String} email Email of the User
 * @apiSuccess {String} phone Phone of the User
 * @apiSuccess {Date} dateOfBirth Bith Date of the User
 * @apiSuccess {String} about Inforamtion about User
 * @apiSuccess {String} password Password about User 
 * 
 * 
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 ok
 *   {
 *      "id" : 1,
 *      "name" : "newName"
 *      "email" : "newEmail@gmail.com",
 *      "phone" : "(063)245-4444",
 *      "dateOfBirth" : "2019-12-12T00:00:00.000Z",
 *      "about" : "New Info...etc",
 *      "password" : "gsdyTv32khjs324da"
 *   }
 * 
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found 
 */
app.put('/:id', UserController.updateUser);







/**
 * @api {post} http://localhost:8080/api/v1/users/posts User post
 * @apiGroup User
 * @apiName Post User
 * 
 * @apiSuccess {String} messege Post Created
 * 
 * @apiSuccessExample {json} Success
 *   HTPP/1.1 200 ok
 *   {
 *       "message": "post created"
 *   }
 * 
 * 
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 */
app.post('/posts', middleWares.modules.verifyToken.modules.verifyToken, UserController.posts);


/**
 * @api {post} http://localhost:8080/api/v1/user/car/:id Add Car for USer
 * @apiName post add car for User
 * @apiGroup User
 * @apiParam {id} id Id of reference between user and car
 * 
 * @apiSuccess {String} _id Id of reference between user and car
 * @apiSuccess {String} userID User id
 * @apiSuccess {String} carId Car id
 * 
 * apiSuccessExample {json} Success
 *   HTTP/1.1 200 ok
 *    {
 *      "_id" :"237462g6372fg",
 *      "userId": "89yucsdjh23",
 *      "carId": "fdsofbj"  
 *    }
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found 
 */
app.post('car/:id', middleWares.modules.verifyToken.modules.verifyToken, UserController.addCar);

/**
 * @api {get} http://localhost:8080/api/v1/user/car Get all Cars of User
 * @apiName get get user`s cars
 * @apiGroup  User
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
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found 
 */
app.get('car/', middleWares.modules.verifyToken.modules.verifyToken, UserController.getCars);

/**
 * @api {get} http://localhost:8080/api/v1/user/car/:id Get one car of User
 * @apiName get user`s car
 * @apiGroup  User
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
app.get('car/:id', middleWares.modules.verifyToken.modules.verifyToken, UserController.getOne);


/**
 * @api {delete} http://localhost:8080/api/v1/user/car/:id Remove car from user
 * @apiName delete user`s car
 * @apiGroup User
 * @apiParam {id} id Id of reference between user and car
 * 
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *   {
 *      "messege": "deleted successfully"
 *   }
 * 
 * 
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found 
 */
app.delete('car/:id', middleWares.modules.verifyToken.modules.verifyToken, UserController.deleteCar);


module.exports = app;
