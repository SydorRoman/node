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
app.get('/', UserController.getAllUsers);

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
app.get('/:id',  UserController.getOneUser);




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
 * @api {post} http://localhost:8080/api/v1/users/posts User posts
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
app.post('/posts', middleWares.verifyToken, UserController.posts);



module.exports = app;
