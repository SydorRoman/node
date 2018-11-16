const express = require('express');

const app = express();
const UserController = require('../controllers/userControllers/user');
const middleWares = require('../middlewares/index');

const refUserCar = require('../controllers/refController/ref');

console.log(middleWares.modules.verifyToken.modules.verifyToken);

/**
 * @api {get} /users Request All User Infromation
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
 * @api {get} /users/:id Find a User
 * @apiGroup User
 * @apiName GetUser
 * @apiParam {id} id User id
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
 * @api {post} /users Create  User
 * @apiGroup User
 * @apiName Create User
 * 
 * @apiParamExapmle {json} Input
 *   {
 *    "name" : "Kate"
 *    "email" : "kateRAW@gmail.com",
 *    "phone" : "(063)245-4444",
 *    "dateOfBirth" : "(063)245-4444",
 *    "about" : "Student...etc",
 *    "password" : "qwerty1"
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
 *      "name" : "Kate"
 *      "email" : "kateRAW@gmail.com",
 *      "phone" : "(063)245-4444",
 *      "dateOfBirth" : "2019-12-12T00:00:00.000Z",
 *      "about" : "Student...etc",
 *      "password" : "gsdyTv32khjs324da"
 *   }
 * 
 */
app.post('/', UserController.createUser);


/**
 * @api {delete} /users/:id Delete User
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
 * @api {put} /users/:id Update User
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
 * @api {put} /users/changePasswors/:id Update User Password
 * @apiGroup User
 * @apiParam {id} id User id
 * @apiName ChangePassword
 * 
 * @apiParamExample {json} Input
 *   {
 *      "password": "newPassword"
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
app.put('/changePassword/:id', UserController.changePassword);


/**
 * @api {post} /users/login Login User
 * @apiGroup User
 * @apiName Login User
 * 
 * @apiParamsExample {json} Input
 *   {
 *      "email" : "userEmail@gmail.com",
 *      "password" : "password"
 *   }
 * 
 * @apiSuccess {String} _id ID of the User
 * @apiSuccess {String} name Name of the User
 * @apiSuccess {String} email Email of the User
 * @apiSuccess {String} phone Phone of the User
 * @apiSuccess {Date} dateOfBirth Bith Date of the User
 * @apiSuccess {String} about Inforamtion about User
 * @apiSuccess {String} password Password about User 
 * @apiSuccess {String} token User token
 * 
 * 
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 ok
 *   {
 *      {
 *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *      }
 *      {
 *          "id": 1,
 *          "name": "newName"
 *          "email": "newEmail@gmail.com",
 *          "phone": "(063)245-4444",
 *          "dateOfBirth": "2019-12-12T00:00:00.000Z",
 *          "about": "New Info...etc",
 *          "password": "gsdyTv32khjs324da"
 *      }
 *   }
 * 
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found 
 */
app.post('/login', UserController.login);


/**
 * @api {post} /users/posts User post
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
 * @api {post} /user/car/:id Add Car for USer
 * @apiName post refUserCar
 * @apiGroup refUserCar
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
app.post('car/:id', middleWares.modules.verifyToken.modules.verifyToken, refUserCar.addCar);

/**
 * @api {get} /user/car Get all Cars of User
 * @apiName get refUserCar
 * @apiGroup  refUserCar
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
app.get('car/', middleWares.modules.verifyToken.modules.verifyToken, refUserCar.getCars);

/**
 * @api {get} /user/car/:id Get one car of User
 * @apiName get refUserCar
 * @apiGroup  refUserCar
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
app.get('car/:id', middleWares.modules.verifyToken.modules.verifyToken, refUserCar.getOne);


/**
 * @api {delete} /user/car/:id Remove car from user
 * @apiName delete refUSerCar
 * @apiGroup refUserCar
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
app.delete('car/:id', middleWares.modules.verifyToken.modules.verifyToken, refUserCar.deleteCar);


module.exports = app;
