const express = require('express');

const app = express();
const UserController = require('../controllers/userControllers/user');
const middleWares = require('../middlewares/index');

console.log(middleWares.modules.verifyToken.modules.verifyToken);

app.get('/', UserController.getAll);

app.get('/:id', UserController.getOne);

app.post('/', UserController.createUser);

app.delete('/:id', UserController.deleteUser);

app.put('/:id', UserController.updateUser);

app.put('/changePassword/:id', UserController.changePassword);

app.post('/login', UserController.login);

app.post('/posts', middleWares.modules.verifyToken.modules.verifyToken, UserController.posts);

module.exports = app;
