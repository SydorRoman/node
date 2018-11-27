const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const hash = require('../../../helper/hashPassword');

const { JWT_SECRET } = require('../../../config/config') || {};
const messeges = require('../../../notification/notification');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const login = async (req, res) => {
    let token;
    let user;

    try {
      user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res
          .status(404)
          .send({ messege: messeges.NOT_FOUND });
      }
  
      const isOk = await user.comparePasswords(req.body.password);
  
      if (!isOk) {
        res.sendStatus(403);
        res.send({ message: messeges.BAD_PASSWORD });
      }
  
      if (!user) {
        res.status(404);
        res.send({ message: messeges.NOT_FOUND });
      }
      token = await jwt.sign(
        { user },
        JWT_SECRET,
        { expiresIn: 1000 * 60 * 60 * 24 * 365 },
      );
      if (!req.session) {
        req.session = {};
      }
      //req.session.token = token;
      res.status(200).send({ token, user });
    } catch ({ message: error }) {
      res.status(500).send({ error });
    }
};

const logout = (req,res) => { 
   return res.status(200);
};


const registration = async (req, res) => {

    if (!req.body.password) {
      return res.status(422).send({ message: messeges.PASSWORD_REQUIRE });
    }
    if (!req.body.name) {
      return res.status(422).send({ message: messeges.NAME_REQUIRED });
    }
    if (!req.body.email) {
      return res.status(422).send({ message: messeges.EMAIL_REQUIRE });
    }
  
    const userT = new User(req.body);
    const hashed = await hash.hashPass(userT.password);
  
    userT.password = hashed;
    
  
    userT.save((err) => {
      if (err) {
        return res.status(400).send(err); 
      }
      else{
  
        res.status(201).send({ userT });
      }
    });
  };
  
  const changePassword = async (req, res) => {

    const { user } = req;

    if(req.params.id !== user._id)
    {
      return res.status(403).send({message: messeges.PROHIBITED_PERMISSIOM});
    }

    const password = await hash.hashPass(req.body.password);
    User.findByIdAndUpdate(
      req.params.id,
      { password },
      { new: true, runValidators: true },
    )
      .exec()
      .then((userData) => {
        res.status(200).send(userData);
      })
      .catch(err => res.status(404).send(err));
  };


  const changeEmail = async (req, res) => {

    const { user } = req;

    if(req.params.id !== user._id)
    {
      return res.status(403).send({message: messeges.PROHIBITED_PERMISSIOM});
    }

    User.findByIdAndUpdate(
      req.params.id,
      { email: req.body.email },
      { new: true, runValidators: true },
    )
      .exec()
      .then((userData) => {
        res.status(200).send(userData);
      })
      .catch(err => res.status(404).send(err));
  };

  module.exports = {
      changePassword,
      changeEmail,
      login,
      registration,
      logout,
  };
