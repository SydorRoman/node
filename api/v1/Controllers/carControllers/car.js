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


module.exports = {
    getAllCars,
}
