const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Car = require('../../models/car');
const refUserCar = require('../../models/refUserCar');


const app =express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const { JWT_SECRET } = require('../../../config/config');
const messeges = require('../../../notification/notification');

const parseJwt = token => token.split(' ')[1];

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

const getOne = (req,res) => {

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
    addCar,
    getCars,
    getOne,
    deleteCar,

}
