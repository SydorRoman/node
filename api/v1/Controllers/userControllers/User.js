const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const hash = require('../../../helper/hashPassword');
const Car = require('../../models/car');
const refUserCar = require('../../models/refUserCar');
const Product = require('../../models/product')

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


        // Do smth with error =======> 
        // (node:96351) DeprecationWarning: collection.findAndModify is deprecated.
        // Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
  User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .exec()
    .then(userData => res.status(200).send(userData))
    .catch(err => res.status(404).send(err));
};

// reference betwwen User and Car



const getUserCars = (req,res) => {

    const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);
    
    User.findById(decoded.user._id, (err,result) => {
        if (err) {
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });

    refUserCar.find({userId: decoded.user._id} ,(err,result) => {
        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        }

        const carsID =  result.map(el => el.carId);

        Car.find( { '_id': { $in: carsID }}, (error, resultCar ) => {
            if(error){
                return res.send({ messege: messeges.NOT_FOUND});
            }
            return res.send(resultCar);
        });
    });
};

const getUserCar = (req,res) => {

    const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);

    User.find({_id: decoded.user._id}, (err,result) => {
        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });

    refUserCar.find({userId: decoded.user._id, carId: req.params.id}, (err,result) => {
        if(err){
            return res.status(404).send({ messege: messeges.NOT_FOUND});
        }
        if(result.length === 0)
        {
            return res.send({message: messeges.NOT_FOUND});
        }
        Car.findById(req.params.id, (error,data) => {
            if(error){
                return res.send({ messege: messeges.NOT_FOUND});
            }
            return res.send(data);
        });
    });
};

const addCarToUser = (req,res) => {
    
    const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);

    const tempUser = new refUserCar({userId: decoded.user._id, carId: req.params.id});

    console.log("here");

    tempUser.save((err) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).send(tempUser);
    });
};


const deleteCarFromUser = (req,res) => {
    const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);

    User.find({_id: decoded.user._id}, (err,result) => {
        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });

    refUserCar.findOneAndDelete({userId: decoded.user._id, carId: req.params.id}, (err,result) => {

        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        }
        return res.send({ messege: messeges.DELETED_SUCCESSEFULLY });

    });
};

//                      *** ADMIN ***

const getAllUsersOfCar = (req,res) => {
    Car.findById(req.params.id, (err,result) => {
        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        };
    });

    refUserCar.findOne({carId: req.params.id}, (err,result) => {
        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        };
        
        const userId =  result.map(el => el.userId);

        User.find({ '_id': { $in: userId }}, (err,userData) => {
            if(err){
                return res.send({ messege: messeges.NOT_FOUND});
            };
            return res.send(userData);
        });
    });
};

const getAnyUserCars = (req,res) => {
    
    User.findById(req.params.id, (err,result) => {
        if (err) {
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });

    refUserCar.find({userId: req.params.id} ,(err,result) => {
        if(err){
            return res.send({ messege: messeges.NOT_FOUND });
        }

        const carsID =  result.map(el => el.carId);

        Car.find( { '_id': { $in: carsID }}, (error, resultCar ) => {
            if(error){
                return res.send({ messege: messeges.NOT_FOUND});
            }
            return res.send(resultCar);
        });
    });
};

const addCarToUserAdmin = (req,res) => {

    const tempUser = new refUserCar({userId: req.query.userId, carId: req.query.carId});

    User.findById(req.query.userId, (err,result) => {
        if (err) {
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });

    Car.findById(req.query.carId, (err,result) => {
        if (err) {
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });

    tempUser.save((err) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).send({message: messeges.SUCCESS});
    });
};

const deleteCarFromUserAdmin = (req,res) => {

    User.findById(req.query.userId, (err,result) => {
        if (err) {
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });

    Car.findById(req.query.carId, (err,result) => {
        if (err) {
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });
    refUserCar.findOneAndDelete({userId: req.query.userId, carId: req.query.carId}, (err,result) => {
        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        }
        return res.send({ messege: messeges.DELETED_SUCCESSEFULLY });

    });
};


/*                      *** FOR ADMIN ***
        * add car
        * update car
        * delete car

        * get all users of car
        * get all cars of any user
        * add car to user
        * remove car from user 
*/

module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  posts,

  getUserCar,
  getUserCars,
  deleteCarFromUser,
  addCarToUser,

  getAllUsersOfCar,
  getAnyUserCars,
  addCarToUserAdmin,
  deleteCarFromUserAdmin,

};
