const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const jwt = require('jsonwebtoken');
const Product = require('../../models/product');

const { JWT_SECRET } = require('../../../config/config');
const messeges = require('../../../notification/notification');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const parseJwt = token => token.split(' ')[1];


const getProducts = (req, res) => {
  const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);

  Product.find({ userId: decoded.user._id }, (err, result) => {
    if (err) {
      return res.json({
        messege: messeges.LIST_EMPTY,
      });
    }

    return res.send(result);
  });
};

const getOneProduct = (req, res) => {
  const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);
  
  Product.findOne({_id: req.params.id, userId: decoded.user._id}, (err, result) => {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

const addProduct = (req, res) => {
  const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);

  const productTemp = new Product(req.body);

  productTemp.userId = decoded.user._id;

  productTemp.save((err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(productTemp);
    }
  });
};

const deleteProduct = (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return res.status(404).send(err);
    }
    return res.send(messeges.DELETED_SUCCESSEFULLY);
  });
};

const editProduct = (req, res) => {
  if (req.body.userId) delete req.body.userId;

  const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);

  const tempUserId = decoded.user._id;

  Product.findById(req.params.id, (err,result) => {
    if (err) {
        return res.send(messeges.NOT_FOUND);
    }
    if(JSON.stringify(tempUserId) !== JSON.stringify(result.userId)){
        return res.send.json({
          messege: messeges.PROHIBITED_PERMISSIOM,
        });
    }

  });

  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec()
    .then(productTemp => res.status(200).send(productTemp))
    .catch(err => res.status(404).send(err));
};

module.exports = {
  getProducts,
  getOneProduct,
  addProduct,
  deleteProduct,
  editProduct,
};
