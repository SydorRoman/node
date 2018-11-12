const Product = require('../../Models/Product');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const getProducts = async (req,res) => {

   const decoded  = jwt.decode(req.session.token,'secretKey');


    Product.find({userId: decoded.user._id}, (err,result) => {

    

        if(err) return res.json({
            messege: 'List of products is empty'
        })
        else{
            console.log('RESULTS');
            return res.send(result);
        };
    });

};

const addProduct = (req,res) => {
    
    const decoded  = jwt.decode(req.session.token,'secretKey');

    productTemp = new Product(req.body);
    
    productTemp.userId = decoded.user._id;

    productTemp.save((err) => {
        if(err){
            res.status(400).send(err); 
        }
        else{
            res.status(200).send(productTemp);
        }
    });

};

const deleteProduct = (req,res) => {
    

    Product.findByIdAndRemove(req.params.id, (err,result) => {

        if(err) {
            return res.status(404).send(err);
        }
        else{
            res.send('product deleted successfully');
        };
    });
};


const editProduct = (req,res) => {

    if (req.body.userId) delete req.body.userId;

    Product.findByIdAndUpdate(req.params._id, req.body, {new: true})
        .exec()
        .then(productTemp => res.status(200).send(productTemp))
        .catch(err => res.status(404).send(err))
};

module.exports = {
    getProducts,
    addProduct,
    deleteProduct,
    editProduct,
}