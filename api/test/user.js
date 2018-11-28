//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../v1/models/user');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config')

const hash = require('../helper/hashPassword');

chai.use(chaiHttp);

let token = 'da';

describe('User', () => {
  after((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  before(async () => {
    userT = new User({
      name: 'name',
      email: 'name1@gmail.com',
      password: '$2b$10$LV5jHPplB5b0L5jmYUq4seZcGKE0yoZp9f2C7dPK1ciFrs6pCvVAa',
      phone: "(063)245-4444",
      dateOfBirth: "2019-12-12T00:00:00.000Z",
      about: "Info"
    })
    await userT.save((err, userT) => {
    
      if (err) {
        return err;
      }
    });
    userT.password = 'test';
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(userT)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        res.body.should.have.property('user')
      });
  });

  describe('/GET user', () => {

    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.users.should.be.a('array');
          done();
        });
    });
  });

  describe('/GET/:id user', () => {
    it('it should GET a user by the given id', (done) => {
      userT.save((err, userT) => {
        chai.request(server)
          .get('/api/v1/users/' + userT._id)
          .send(userT)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('email');
            res.body.should.have.property('password');
            res.body.should.have.property('phone');
            res.body.should.have.property('about');
            res.body.should.have.property('dateOfBirth');
            // res.body.should.have.property('_id').eql(user._id);
            done();
          });
      });
    });
  });

  describe('/PUT/:id user', () => {
    it('it should UPDATE a user given the id', (done) => {
      userT.save((err, userT) => {
        chai.request(server)
          .put('/api/v1/users/' + userT._id)
          .set('Authorization', `Bearer ${token}`)
          .send({ name: 'new' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('new');
            done();
          });
      });
    });
    it('it should UPDATE a user given the id', (done) => {
      userT.save((err, userT) => {
        chai.request(server)
          .put('/api/v1/users/' + userT._id)
          .send({ phone: '(063)444-4444' })
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('phone').eql('(063)444-4444');
            done();
          });
      });
    });
    it('it should UPDATE a user given the id', (done) => {
      userT.save((err, userT) => {
        chai.request(server)
          .put('/api/v1/users/' + userT._id)
          .send({ dateOfBirth: '2019-10-10T00:00:00.000Z' })
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('dateOfBirth').eql('2019-10-10T00:00:00.000Z');
            done();
          });
      });
    });
    it('it should UPDATE a user given the id', (done) => {
      let user = new User({
        name: 'name',
        email: 'name@gmail.com',
        phone: '(063)245-4444',
        dateOfBirth: '2020-10-10T00:00:00.000Z',
        about: 'Lalal lalal',
        password: 'pass'
      })
      userT.save((err, userT) => {
        chai.request(server)
          .put('/api/v1/users/' + userT._id)
          .send({ about: 'new info' })
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('about').eql('new info');
            done();
          });
      });
    });
  });


  describe('/DELETE/:id user', () => {
    it('it should DELETE a user given the id', (done) => {
      userT.save((err, userT) => {
        chai.request(server)
          .delete('/api/v1/users/' + userT._id)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Deleted sucessefully')
            done();
          });
      });
    });
  });


});