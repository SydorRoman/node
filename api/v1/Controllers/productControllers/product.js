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
  const { user } = req;

  Product.find({ userId: user.user._id }, (err, result) => {
    if (err) {
      return res.send({
        messege: messeges.LIST_EMPTY,
      });
    }

    return res.status(200).send(result);
  });
};

const getOneProduct = (req, res) => {
  const { user } = req;
  const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);

  Product.findOne({ _id: req.params.id }, (err, resultProduct) => {

    if (err) return res.status(404).send(err);

    if (JSON.stringify(resultProduct.userId) !== JSON.stringify(user.user._id)) {
      return res.status(403).send({ messege: messeges.PROHIBITED_PERMISSIOM });
    }

    Product.findOne({ _id: req.params.id, userId: decoded.user._id }, (err, result) => {
      if (err) {
        return res.send(err);
      }
      return res.send(result);
    });
  });
};

const addProduct = (req, res) => {
  const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);

  if (isNaN(req.body.price)) {
    console.log("here")
    return res.status(400).send({ messege: messeges.WRONG_FORMAT });
  }

  const productTemp = new Product(req.body);
  if (!productTemp.productName) return res.status(422).send({ messege: messeges.NAME_REQUIRED });

  productTemp.userId = decoded.user._id;


  productTemp.save((err) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(201).send(productTemp);
    }
  });
};

const deleteProduct = (req, res) => {
  const { user } = req;
  Product.findOne({ _id: req.params.id }, (err, result) => {
    if (err) return res.status(404).send(err);

    if (result.userId !== user._id) {
      return res.status(403).send({ messege: messeges.PROHIBITED_PERMISSIOM });
    }
    Product.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        return res.status(404).send(err);
      }
      return res.send({ messege: messeges.DELETED_SUCCESSEFULLY });
    });
  });
};

const editProduct = (req, res) => {
  if (req.body.userId) delete req.body.userId;
  const { user } = req;

  if (isNaN(req.body.price)) {
    return res.status(400).send({ messege: messeges.WRONG_FORMAT });
  }

  const tempUserId = user._id;
  //const decoded = jwt.decode(parseJwt(req.headers.authorization), JWT_SECRET);
  //const tempUserId = decoded.user._id;

  Product.find({ _id: req.params.id }, (err, resProduct) => {
    if (err) return res.status(404).send({ messege: messeges.NOT_FOUND });

    if (resProduct.userId !== user._id) {
      return res.status(403).send({ messege: messeges.PROHIBITED_PERMISSIOM });
    }
    Product.findById(req.params.id, (err, result) => {
      if (err) {
        return res.send(messeges.NOT_FOUND);
      }
      if (JSON.stringify(tempUserId) !== JSON.stringify(result.userId)) {
        return res.send({
          messege: messeges.PROHIBITED_PERMISSIOM,
        });
      }

    });
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
