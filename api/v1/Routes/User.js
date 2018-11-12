const express = require('express');
const app = express();
const UserController = require('../Controllers/userControllers/User');
const middleWares = require('../Middlewares/index');
console.log(middleWares.modules.verifyToken.modules.verifyToken);

app.get('/', UserController.getAll);

app.get('/:id', UserController.getOne);

app.post('/', UserController.createUser);

app.delete('/:_id', UserController.deleteUser);

app.put('/:_id', UserController.updateUser);

app.put('/changePassword/:_id', UserController.changePassword);

app.post('/login', UserController.login);

app.post('/posts', middleWares.modules.verifyToken.modules.verifyToken,  UserController.posts);


module.exports = app;