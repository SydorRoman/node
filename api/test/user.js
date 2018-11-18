//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../v1/models/user');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

chai.use(chaiHttp);

const user = { 
    name: "name",
    password: "123",
    email: "name@gmail.com",
    phone: "(063)245-4444",
    dateOfBirth: "2020-10-10T00:00:00.000Z",
    about: "Lalal lalal"
   }

describe('User', () => {
    beforeEach((done) => { 
        User.remove({}, (err) => { 
           done();         
        });     
    });

  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/v1/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.users.should.be.a('array');
                res.body.users.length.should.be.eql(0);
              done();
            });
        });
  });


  describe('/POST user', () => {
    it('it should not POST a user without name field', (done) => {
    delete user.name;
      chai.request(server)
          .post('/api/v1/users')
          .send(user)
          .end((err, res) => {
              res.should.have.status(400);
              const { body } = res; //const body = res.body;
              body.should.be.a('object');
              body.should.have.property('name');
              body.errors.name.should.have.property('kind').eql('required');
            done();
          });
    });
    it('it should not POST a user without email field', (done) => {
        let user = { 
          name: "name",
          phone: "(063)245-4444",
          dateOfBirth: "2020-10-10T00:00:00.000Z",
          about: "Lalal lalal",
          password: "123",
         }
        chai.request(server)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.errors.should.have.property('email');
                res.body.errors.email.should.have.property('kind').eql('required');
              done();
            });
      });
      it('it should not POST a user without password field', (done) => {
        let user = { 
          name: "name",
          email: "name@gmail.com",
          phone: "(063)245-4444",
          dateOfBirth: "2020-10-10T00:00:00.000Z",
          about: "Lalal lalal"
        }
        chai.request(server)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                console.log();
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.error.should.have.property('password');
                res.body.errors.password.should.have.property('kind').eql('required');
              done();
            });
      });
    });
    

});
