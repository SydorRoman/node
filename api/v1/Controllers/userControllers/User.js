const User  = require('../../Models/User'); 
const hash = require('../../../helper/hashPassword');
const jwt = require('jsonwebtoken');


const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
 
const posts = (req,res) => {

    jwt.verify(req.token, 'scretkey', (err,authData) => {
        if (data) {
            res.sendStatus(403);
        }else{
            res.json({
                message: 'post created',
                authData
            });
        }; 
    });
};

const login = async (req,res) => {

    let token;
    let user;

    
 
    try {
        user = await User.findOne({email: req.body.email});

        const isOk = await user.comparePasswords(req.body.password);

        if (!isOk) {
            res.sendStatus(403);
            res.send({message: 'bad password'});
        }

        if (!user) {
            res.status(404);
            res.send({ error: 'user not found' });
        }
        token = await jwt.sign({ user }, 'secretkey', { expiresIn: '30s' });
        if (!req.session) {
            req.session = {}
        }
        req.session.token = token;
    } catch ({ message }) {
        res.status(500);
        res.send({ error: message });
    }
     res.send({ token, user });
};

const getAll = async (req, res) => {

    let usersCount;
    try {
        usersCount = await User.count({});
    } catch ({ message: error }) {
        res.send({ error });
    }

    console.log(usersCount);

    User.find({}, (err,result) => {
        if(err){
                res.send(err);
        }
        res.send({users: result, count: usersCount});
    });
}

const getOne = (req,res) => {

    User.findById(req.params.id, (err,result) => { 
        if(err) {
            res.sendStatus(404);
        }
        res.send(result);
    });
}


const createUser = async (req, res) => {
    var userT = new User(req.body);

    const hashed = await hash(userT.password);

    userT.password = hashed;

    userT.save((err) => {
        if(err){
            res.status(400).send(err);
        }
        res.status(201).send(userT);
    });
}

const deleteUser = (req,res) => {

    User.findByIdAndRemove(req.params, (err,result) => {
        if(err)
        {
            res.sendStatus(404);
           res.send(err);
        }
        res.send('User deleted successfully');
    });
}

const updateUser = (req,res) => {


    console.log("dsads");
    if (req.body.password) delete req.body.password;

    User.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
        .exec()
        .then(userData => res.status(200).send(userData))
        .catch(err => res.status(404).send(err));
}

const changePassword = async(req,res) => {

    const password =  await hash(req.body.password);
    User.findByIdAndUpdate(req.params._id, { password }, {new: true, runValidators: true})
        .exec()
        .then(userData => res.status(200).send(userData))
        .catch(err => res.status(404).send(err));
}

module.exports = {
    getAll,
    getOne,
    createUser,
    deleteUser,
    updateUser,
    changePassword,
    login, 
    posts,
}