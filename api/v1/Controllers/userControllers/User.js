const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const hash = require('../../../helper/hashPassword');
const Car = require('../../models/car');
const refUserCar = require('../../models/refUserCar');



const { JWT_SECRET } = require('../../../config/config');
const messeges = require('../../../notification/notification');

const app = express();
app.use(bodyParser.json());
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

const login = async (req, res) => {
  let token;
  let user;

  try {
    user = await User.findOne({ email: req.body.email });

    const isOk = await user.comparePasswords(req.body.password);

    if (!isOk) {
      res.sendStatus(403);
      res.send({ message: messeges.BAD_PASSWORD });
    }

    if (!user) {
      res.status(404);
      res.send({ error: messeges.NOT_FOUND });
    }
    console.log()
    token = await jwt.sign({ user }, JWT_SECRET, { expiresIn: 1000 * 60 * 60 * 24 * 365 });
    if (!req.session) {
      req.session = {};
    }
    req.session.token = token;
    res.send({ token, user });
  } catch ({ message }) {
    res.status(500);
    res.send({ error: message });
  }
};

const getAll = async (req, res) => {
  let usersCount;
  try {
    usersCount = await User.count({});
  } catch ({ message: error }) {
    res.send({ error });
  }

  User.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send({ users: result, count: usersCount });
  });
};

const getOne = (req, res) => {
  User.findById(req.params.id, (err, result) => {
    if (err) {
      res.sendStatus(404);
    }
    res.send(result);
  });
};

const createUser = async (req, res) => {

  if(!req.body.password)
  {
      return res.status(422).send({
          message: messeges.PASSWORD_REQUIRED,
      })
  }

  const userT = new User(req.body);
  const hashed = await hash.hashPass(userT.password);

  userT.password = hashed;
  let token;

  userT.save((err) => {
    if (err) {
      return res.status(400).send(err); 
    }
    else{
      token = jwt.sign({ userT }, JWT_SECRET, { expiresIn: 1000 * 60 * 60 * 24 * 365 });
      req.session.token = token;
      res.status(201).send({ token, userT });
    }
  });

};

const deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.sendStatus(404);
      res.send(err);
    }
    res.send(messeges.DELETED_SUCCESSEFULLY);
  });
};

const updateUser = (req, res) => {
  if (req.body.password) delete req.body.password;

  User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .exec()
    .then(userData => res.status(200).send(userData))
    .catch(err => res.status(404).send(err));
};

const changePassword = async (req, res) => {
  const password = await hash.hashPass(req.body.password);
  User.findByIdAndUpdate(req.params.id, { password }, { new: true, runValidators: true })
    .exec()
    .then(userData => res.status(200).send(userData))
    .catch(err => res.status(404).send(err));
};


// reference betwwen User and Car



const getCars = (req,res) => {
    const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);
    

    User.findById(decoded.user._id, (err,result) => {
        if (err) {
            console.log("here")
            return res.json({
                messege: messeges.NOT_FOUND,
            });
        }
    });

    refUserCar.find({userId: decoded.user._id} ,(err,result) => {
        if(err){
            console.log("35here")
            return res.json({
                messege: messeges.NOT_FOUND, 
            });
        }

        const carsID =  result.map(el => el.carId);

        Car.find( { '_id': { $in: carsID }}, (error, resultCar ) => {
            if(error){
                console.log("45here")
                return res.json({
                    messege: messeges.NOT_FOUND,
                });
            }
            res.send(resultCar);
        });
    });
};

const getOneCar = (req,res) => {

    const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);

    User.find({_id: decoded.user._id}, (err,result) => {
        if(err){
            console.log(61);
            return res.json({
                messege: messeges.NOT_FOUND,
            });
        }
    });

    refUserCar.find({userId: decoded.user._id, carId: req.params.id}, (err,result) => {
        if(err){
            console.log(70);
            return res.json({
                messege: messeges.NOT_FOUND,
            });
        }

        Car.findById(req.params.id, (error,data) => {
            if(error){
                console.log(78);
                return res.json({
                    messege: messeges.NOT_FOUND,
                });
            }
            res.send(data);
        });
    });
};

const addCar = (req,res) => {
    
    const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);

    const tempUser = new refUserCar({userId: decoded.user._id, carId: req.params.id});

    tempUser.save((err) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).send(tempUser);
    });
};


const deleteCar = (req,res) => {
    const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);

    User.find({_id: decoded.user._id}, (err,result) => {
        if(err){
            return res.json({
                messege: messeges.NOT_FOUND,
            });
        }
    });

    refUserCar.findOneAndDelete({userId: decoded.user._id, carId: req.params.id}, (err,result) => {

        if(err){
            return res.json({
                messege: messeges.NOT_FOUND,
            });
        }
        res.send({
            messege: messeges.DELETED_SUCCESSEFULLY,
        });

    });
};

module.exports = {
  getAll,
  getOne,
  createUser,
  deleteUser,
  updateUser,
  changePassword,
  login,
  posts,
  getCars,
  getOneCar,
  deleteCar,
  addCar,

};
