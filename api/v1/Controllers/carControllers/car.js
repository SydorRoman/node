const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const Car = require('../../models/car');
const User = require('../../models/user');
const refUserCar = require('../../models/refUserCar');

const { JWT_SECRET } = require('../../../config/config');
const messeges = require('../../../notification/notification');

const getAllCars = (req,res) => {

    Car.find({}, (err, result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    });
};

//admin
const createCar = (req,res) => {

    if (req.body._id) delete req.body._id;
    const car = new Car(req.body);
    
    car.save((err) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.status(200).send({car});
        }
    });
};

//admin
const updateCar = (req,res) => {

    const carModel = req.body.model;

    Car.findOneAndUpdate(
        { _id: req.params.id},
        { model: carModel },
        { new: true,  runValidators: true}
    )
    .exec()
    .then((car) => {
        res.status(200).send(car);
    })
    .catch((err) => {
        res.status(404).send(err)
    });

};

//admin
const deleteCar = (req, res) => { // delete reference

    Car.findByIdAndDelete(req.params.id, (err,result) => {
        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        }
        return res.send({ messege: messeges.DELETED_SUCCESSEFULLY });
    })

}

const getUserCars = (req,res) => {

    const { user } = req;
    
    User.findById(user._id, (err,result) => {
        if (err) {
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });

    refUserCar.find({userId: user._id} ,(err,result) => {
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

    const { user } =req;

    User.find({_id: user._id}, (err,result) => {
        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });

    refUserCar.find({userId: user._id, carId: req.params.id}, (err,result) => {
        if(err){
            return res.status(404).send({ messege: messeges.NOT_FOUND});
        }
        if(!result.length)
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
    
    const { user } = req;

    const tempUser = new refUserCar({userId: user._id, carId: req.params.id});

    tempUser.save((err) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).send(tempUser);
    });
};

//admin
const deleteCarFromUser = (req,res) => {

    const { user } = req;

    User.find({_id: user._id}, (err,result) => {
        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });

    refUserCar.findOneAndDelete({userId: user._id, carId: req.params.id}, (err,result) => {

        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        }
        if(!result)
        {
            return res.send({ messege: messeges.NOT_FOUND});
        }
        return res.send({ messege: messeges.DELETED_SUCCESSEFULLY });

    });
};

//                      *** ADMIN ***
//admin
const getAllUsersOfCar = (req,res) => {
    Car.findById(req.params.id, (err,result) => {
        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        };
    });

    refUserCar.find({carId: req.params.id}, (err,result) => {
        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        };
        const userId = result.map(el => el.userId);

        User.find({ '_id': { $in: userId }}, (err,userData) => {
            if(err){
                return res.send({ messege: messeges.NOT_FOUND});
            };
            return res.send(userData);
        });
    });
};
//admin
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
//admin
const addCarToUserAdmin = (req,res) => {

    const tempRef = new refUserCar({userId: req.params.userId, carId: req.params.carId});

    User.findById(req.params.userId, (err,result) => {
        if (err) {
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });

    Car.findById(req.params.carId, (err,result) => {
        if (err) {
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });
    tempRef.save((err) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).send({messege: messeges.SUCCESS});
    });
};
//admin
const deleteCarFromUserAdmin = (req,res) => {

    User.findById(req.params.userId, (err,result) => {
        if (err) {
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });

    Car.findById(req.params.carId, (err,result) => {
        if (err) {
            return res.send({ messege: messeges.NOT_FOUND});
        }
    });
    refUserCar.findOneAndDelete({userId: req.params.userId, carId: req.params.carId}, (err,result) => {
        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        }
        return res.send({ messege: messeges.DELETED_SUCCESSEFULLY });

    });
};


module.exports = {
    getAllCars,
    getUserCar,
    getUserCars,
    deleteCarFromUser,
    addCarToUser,

    createCar,
    updateCar,
    deleteCar,
    getAllUsersOfCar,
    getAnyUserCars,
    addCarToUserAdmin,
    deleteCarFromUserAdmin,

};
