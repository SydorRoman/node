const express = require('express');
const app = express();
const UserController = require('../Controllers/userControllers/User');
const jwt = require('jsonwebtoken');

app.get('/', UserController.getAll);

app.get('/:id', UserController.getOne);

app.post('/', UserController.createUser);

app.delete('/:_id', UserController.deleteUser);

app.put('/:_id', UserController.updateUser);

app.put('/changePassword/:_id', UserController.changePassword);

app.post('/login', UserController.login);

app.post('/posts', verifyToken,  UserController.posts);

function verifyToken(req, res, next){
    const bearerHeader = req.header['authorization']; 

    if(typeof bearerHeader !=='undefined'){

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1]; 
        req.token = bearerToken;
        next();

    } else {
        res.sendStatus(403);
    }

}

module.exports = app;