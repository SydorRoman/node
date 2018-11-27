const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const Car = require('../../models/car');

const { JWT_SECRET } = require('../../../config/config');
const messeges = require('../../../notification/notification');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getAllCars = (req,res) => {

    Car.find({}, (err, result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    });
};


const createCar = (req,res) => {

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

const updateCar = (req,res) => {

    const carModel = req.body.mode;;

    Car.findByIdAndUpdate(
        req.params.id,
        { model: carModel },
        { new: true,  runValidators: true}
    )
    .exec()
    .then((car) => {
        res.status(200).send(car);
    })
    .catch((err) => res.status(404).send(err));

};


const deleteCar = (req, res) => { // delete reference
    
    Car.findByIdAndDelete(req.params.id, (err,result) => {
        if(err){
            return res.send({ messege: messeges.NOT_FOUND});
        }
        return res.send({ messege: messeges.DELETED_SUCCESSEFULLY });
    })

}




module.exports = {
    getAllCars,
    createCar,
    updateCar,
    deleteCar,

};
