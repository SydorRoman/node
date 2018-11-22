const express = require('express');

const app = express();
const AuthController = require('../controllers/authController/auth');
const middleWares = require('../middlewares/index');


/**
 * @api {post} http://localhost:8080/api/v1/auth/registration Register User
 * @apiGroup Auth
 * @apiName Register User
 * 
 * @apiParamExample {json} Input
 *   {
 *    "name" : "Kate (required)"
 *    "email" : "kateRAW@gmail.com (required)",
 *    "phone" : "(063)245-4444",
 *    "dateOfBirth" : "(063)245-4444",
 *    "about" : "Student...etc",
 *    "password" : "qwerty1 (required)"
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
app.post('/registration', AuthController.registration);

/**
 * @api {put} http://localhost:8080/api/v1/auth/changePassword/:id Update User Password
 * @apiGroup Auth
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
 *      "email" : "Email@gmail.com",
 *      "phone" : "(063)245-4444",
 *      "dateOfBirth" : "2019-12-12T00:00:00.000Z",
 *      "about" : "New Info...etc",
 *      "password" : "gsdyTv32khjs324da"
 *   }
 * 
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 */
app.put('/changePassword/:id', AuthController.changePassword);

/**
 * @api {put} http://localhost:8080/api/v1/auth/changeEmail/:id Update User Email
 * @apiGroup Auth
 * @apiParam {id} id User id
 * @apiName ChangeEmail
 * 
 * @apiParamExample {json} Input
 *   {
 *      "email": "newEmail@gmail.com"
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
app.put('/changeEmail/:id', AuthController.changeEmail);

/**
 * @api {post} http://localhost:8080/api/v1/auth/login Login User
 * @apiGroup Auth
 * @apiName Login User
 * 
 * @apiParamExample {json} Input
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
app.post('/login', AuthController.login);

module.exports = app;
