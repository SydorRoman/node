const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Product = require('../../models/product')

const { JWT_SECRET } = require('../../../config/config');
const messeges = require('../../../notification/notification');

const app = express();
app.use(bodyParser.json()); // remove this
app.use(bodyParser.urlencoded({ extended: true }));


const parseJwt = token => token.split(' ')[1];

const posts = (req, res) => {
  jwt.verify(req.token, JWT_SECRET, (err, authData) => {
    if (authData) {
      res.sendStatus(403);
    } else {
      res.json({
        message: messeges.POST_CREATED,
        authData,
      });
    }
  });
};



const getAllUsers = async (req, res) => {
  let usersCount;
  try {
    usersCount = await User.count({});
  } catch ({ message: error }) {
    res.send({ error });
  }

  User.find({}, (err, result) => {
    if (err) {
      res.send({error: err});
    }
    res.send({ users: result, count: usersCount });
  });
};

const getOneUser = (req, res) => {
  User.findById(req.params.id, (err, result) => {
    if (err) {
      res.status(404).send({message: messeges.NOT_FOUND})
    }
    res.status(200).send( result );
  });
};



const deleteUser = (req, res) => {

  const { user } = req;
  
  if(req.params.id !== user._id)
  { 
    return res.status(403).send({message: messeges.PROHIBITED_PERMISSIOM});
  }

  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.sendStatus(404);
      res.send(err);
    }
    Product.findOneAndRemove({userId: req.params.id,}, (error) => {
        if(error) { res.status(404).send({message: messeges.NOT_FOUND})};
    });
    res.send({message: messeges.DELETED_SUCCESSEFULLY});
  });
};

const updateUser = (req, res) => {
  if (req.body.password) delete req.body.password;

  const { user } = req;


  if(req.params.id !== user._id)
  {
    return res.status(403).send({message: messeges.PROHIBITED_PERMISSIOM});
  }

  User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .exec()
    .then(userData => { res.status(200).send(userData)})
    .catch(err => res.status(404).send(err));
};



module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  posts
};
