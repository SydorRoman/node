process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Car = require('../v1/models/car');
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
let adminToken = '123';
let user;

let car = new Car({
    model: "model"
})

describe('Car', () => {
    before(async () => {
        user = new User({
            name: 'name',
            role: 'ADMIN',
            email: 'caruser@gmail.com',
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

    after((done) => {
        Car.remove({}, (err) => {
            done();
        });
    });
    after((done) => {
        RefUserCar.remove({}, (err) => {
            done();
        });
    });

    describe('/GET all cars', () => {
        it('it should GET all cars', (done) => {
            chai.request(server)
                .get('/api/v1/cars')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET all cars', () => {
        it('it should GET all cars of user', (done) => {
            chai.request(server)
                .get('/api/v1/cars/all')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET one car', () => {
        it('it should GET one car of user', (done) => {
            car.save((err, car) => {
                refUserCar = new RefUserCar({
                    userId: user._id,
                    carId: car._id
                })
                refUserCar.save((err, ref) => {
                    chai.request(server)
                        .get('/api/v1/cars/one/' + car._id)
                        .set('Authorization', `Bearer ${token}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property('model');
                            done();
                        });
                });
            });
        });
    });

    describe('/POST car to user', () => {
        it('it should POST car to user', (done) => {
            car.save((err, car) => {
                refUserCar = new RefUserCar({
                    userId: user._id,
                    carId: car._id
                })
                refUserCar.save((err, ref) => {
                    chai.request(server)
                        .post('/api/v1/cars/add/' + car._id)
                        .set('Authorization', `Bearer ${token}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property('userId');
                            res.body.should.have.property('carId');
                            done();
                        });
                });
            });
        });
    });

    describe('/DELETE car to user', () => {
        it('it should DELETE car from user', (done) => {
            car.save((err, car) => {
                refUserCar = new RefUserCar({
                    userId: user._id,
                    carId: car._id
                })
                refUserCar.save((err, ref) => {
                    chai.request(server)
                        .delete('/api/v1/cars/remove/' + car._id)
                        .set('Authorization', `Bearer ${token}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property('messege').eql('Deleted sucessefully');
                            done();
                        });
                });
            });
        });
    });

    describe('/POST create car (ADMIN)', () => {
        it('it should POST car (ADMIN)', (done) => {
            car.save((err, car) => {
                chai.request(server)
                    .post('/api/v1/cars')
                    .set('Authorization', `Bearer ${token}`)
                    .send(car)
                    .end((err, res) => {
                        //if (err) { console.log(err);}
                        res.should.have.status(200);
                        res.body.car.should.have.property('model');
                        done();
                    });
            });
        });
    });

    describe('/DELETE delete car (ADMIN)', () => {
        it('it should DELETE car (ADMIN)', (done) => {
            car.save((err, car) => {
                console.log('DELETE :: car :: ', car);
                chai.request(server)
                    .delete('/api/v1/cars/' + car._id)
                    .set('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                        //if (err) { console.log(err);}
                        res.should.have.status(200);
                        res.body.should.have.property('messege').eql('Deleted sucessefully')
                        done();
                    });
            });
        });
    });


    describe('/PUT put car (ADMIN)', () => {
        it('it should PUT car (ADMIN)', async (done) => {
            const newCar = await Car.create({ model: 'MMM' });
            chai.request(server)
                .put('/api/v1/cars/' + newCar._id)
                .set('Authorization', `Bearer ${token}`)
                .send({ model: 'new' })
                .end((err, res) => {
                    if (err) {
                        console.log('car:test :: ', err.message);
                    }
                    res.should.have.status(200);
                    res.body.should.have.property('model');
                    done();
                });
        });
    });

    


});