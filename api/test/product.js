process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Product = require('../v1/models/product');
let User = require('../v1/models/user');
const jwt = require('jsonwebtoken');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

const hash = require('../helper/hashPassword');
const { JWT_SECRET } = require('../config/config');

chai.use(chaiHttp);

const product = {
    productName: "name",
    price: 100,
    about: "about",
    userId: ""
}

let token = '123';

let user;
let tempUserId = 0;
describe('Product', () => {
    before(async () => {
        user = new User({
            name: 'anme',
            email: 'name@gmail.com',
            password: '$2b$10$LV5jHPplB5b0L5jmYUq4seZcGKE0yoZp9f2C7dPK1ciFrs6pCvVAa'
        })
        await user.save((err, user) => {
            if (err) {
                return err;
            }
        });
    
        user.password = 'test';
        chai.request(server)
            .post('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                res.body.should.have.property('user')
            });
    });

    beforeEach((done) => {
        Product.remove({}, (err) => {
            done();
        });
    });

    describe('/GET prodcuts', () => {
        it('it should GET all products of user', (done) => {
            chai.request(server)
                .get('/api/v1/products')
                //   .headers({'authorization': `Bearer ${token}`})
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/GET/:id product', () => {
        it('it should GET a product by the given id', async (done) => {

            tempUserId = (await User.findOne({ email: user.email}))._id;

            const product = new Product({
                productName: "name",
                price: 100,
                about: "about",
                userId: tempUserId
            })
            product.save((err, product) =>  {
            chai.request(server)
                .get(`/api/v1/products/${product._id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
            }); 
        });
    });


    describe('/PUT/:id product', () => {
        it('it should not POST a product because price is not a number', (done) => {
            const product = new Product({
                name: 'name',
                price: "ten",
                about: "about"
            })
            chai.request(server)
                .put('/api/v1/products/' + product._id)
                .set('Authorization', `Bearer ${token}`)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(400);
                    const { body } = res; //const body = res.body;
                    body.should.be.a('object');
                    done();
                });
        });
        it('it should UPDATE product by the id', (done) => {

        const product = new Product({
            productName: "name",
            price: 100,
            about: "about",
            userId: jwt.decode(token,JWT_SECRET).user._id
           
        })
        product.save((err, product) =>  {
                chai.request(server)
                .put('/api/v1/products/' + product._id)
                .send(product)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('productName');
                    done();
                });
            });
        });
      });

      describe('/DELETE/:id product', () => {
        it('it should DELETE a product given the id', (done) => {
            const product = new Product({
                productName: "name",
                price: 100,
                about: "about",
                 userId: jwt.decode(token,JWT_SECRET).user._id
            })
            product.save((err, product) => {
                chai.request(server)
                .delete('/api/v1/products/' + product._id)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('messege').eql('Deleted sucessefully')
                    done();
                });
            });
        });
    });
    describe('/POST product', () => {
        it('it should not POST a product without product name field', (done) => {
            const product = new Product({
                price: 100,
                about: "about"
            })
            chai.request(server)
                .post('/api/v1/products')
                .set('Authorization', `Bearer ${token}`)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(422);
                    const { body } = res; //const body = res.body;
                    body.should.be.a('object');
                    done();
                });
        });
        it('it should not POST a product because price is not a number', (done) => {
            const product = new Product({
                name: 'name',
                price: "ten",
                about: "about"
            })
            chai.request(server)
                .post('/api/v1/products')
                .set('Authorization', `Bearer ${token}`)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(400);
                    const { body } = res; //const body = res.body;
                    body.should.be.a('object');
                    done();
                });
        });
        it('it should  POST a new product ', (done) => {
            const product = new Product({
                productName: 'name',
                price: 123,
                about: "about"
            })
            chai.request(server)
                .post('/api/v1/products')
                .set('Authorization', `Bearer ${token}`)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('productName');
                    res.body.should.have.property('price');
                    res.body.should.have.property('about');
                    done();
                });
        });
    });
});