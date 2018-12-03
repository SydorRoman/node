const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Product = require('../../models/product')

const { JWT_SECRET } = require('../../../config/config');
const messeges = require('../../../notification/notification');

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
  
  if(req.params.id !== user._id) return res.status(403).send({message: messeges.PROHIBITED_PERMISSION});

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

  if(req.params.id !== user._id) return res.status(403).send({message: messeges.PROHIBITED_PERMISSION});

  User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .exec()
    .then(userData => { res.status(200).send(userData)})
    .catch(err => res.status(404).send(err));
};

const banUser = (req,res) => {
  User.findOneAndUpdate({_id: req.params.id}, {isBanned: true}, { new: true, runValidators: true})
    .exec()
    .then( res.status(200).send({message: messeges.SUCCESS}))
    .catch(err => res.status(404).send({message: messeges.NOT_FOUND}));
};

const rebanUser = (req,res) => {
  User.findOneAndUpdate({_id: req.params.id}, {isBanned: false}, { new: true, runValidators: true})
    .exec()
    .then( res.status(200).send({message: messeges.SUCCESS}))
    .catch(err => res.status(404).send({message: messeges.NOT_FOUND}));
}

const listOfBanned = (req,res) => {
  User.find({isBanned: true}, (err, result) => {
    if (err) {
      res.send({error: err});
    }
    res.send({ users: result });
  });
}

const hardBan = (req,res) => {
  User.findOneAndDelete({_id: req.params.id}, (err) => {
    if(err) return res.status(404).send({message: messeges.NOT_FOUND});
    
    return res.status(200).send({message: messeges.SUCCESS});
  });
};

module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  hardBan,
  listOfBanned,
  banUser,
  rebanUser
};
