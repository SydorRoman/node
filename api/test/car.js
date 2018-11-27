process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Product = require('../v1/models/car');
let User = require('../v1/models/user');
let RefUserCar = require('../v1/models/refUserCar')
const jwt = require('jsonwebtoken');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

const hash = require('../helper/hashPassword');
const { JWT_SECRET } = require('../config/config');

chai.use(chaiHttp);

let token = '123';
let user;
describe('Product', () => {
    before(async () => {
        user = new User({
            name: 'name',
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
        Car.remove({}, (err) => {
            done();
        });
    });
    beforeEach((done) => {
        RefUserCar.remove({}, (err) => {
            done();
        });
    });
    
    // describe('/GET all cars', () => {
    //     it('it should GET all cars', (done) => {
    //         chai.request(server)
    //             .get('/api/v1/cars')
    //             //   .headers({'authorization': `Bearer ${token}`})
    //             .set('Authorization', `Bearer ${token}`)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('array');
    //                 res.body.length.should.be.eql(0);
    //                 done();
    //             });
    //     });
    // });

});