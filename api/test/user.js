//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../v1/models/user');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

const hash = require('../helper/hashPassword');

chai.use(chaiHttp);

const user = { 
    name: 'name',
    password: '123',
    email: 'name@gmail.com',
    phone: '(063)245-4444',
    dateOfBirth: '2020-10-10T00:00:00.000Z',
    about: 'Lalal lalal'
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
              res.should.have.status(422);
              const { body } = res; //const body = res.body;
              body.should.be.a('object');
            done();
          });
    });
    it('it should not POST a user without email field', (done) => {
        let user = { 
          name: 'name',
          phone: '(063)245-4444',
          dateOfBirth: '2020-10-10T00:00:00.000Z',
          about: 'Lalal lalal',
          password: '123',
         }
        chai.request(server)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
           //   console.log(1,res.body)
                res.should.have.status(422);
              done();
            });
      });
      it('it should not POST a user without password field', (done) => {
        let user = { 
          name: 'name',
          email: 'name@gmail.com',
          phone: '(063)245-4444',
          dateOfBirth: '2020-10-10T00:00:00.000Z',
          about: 'Lalal lalal'
        }
        chai.request(server) // different body
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                //console.log(2,res.body);
                res.should.have.status(422);
                res.body.should.be.a('object');
              done();
            });
      });
      it('it should Post a new User', (done) => {
          let user  = {
            name: 'name',
            email: 'name@gmail.com',
            phone: '(063)245-4444',
            dateOfBirth: '2020-10-10T00:00:00.000Z',
            about: 'Lalal lalal',
            password: 'pass'
          }
          chai.request(server)
            .post('/api/v1/users')
            .send(user)
            .end((err,res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.userT.should.have.property('name');
              res.body.userT.should.have.property('email');
              res.body.userT.should.have.property('password');
              done();
          })
      });
    });

    describe('/GET/:id user', () => {
      it('it should GET a user by the given id', (done) => {    
        let user  = new User({
          name: 'name',
          email: 'name@gmail.com',
          phone: '(063)245-4444',
          dateOfBirth: '2020-10-10T00:00:00.000Z',
          about: 'Lalal lalal',
          password: 'pass'
        })
        user.save((err, user) => {
            chai.request(server)
            .get('/api/v1/users/' + user._id)
            .send(user)
            .end((err, res) => {
              //console.log(user._id); 
              //console.log(res.body._id);
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
          let user  = new User({
            name: 'name',
            email: 'name@gmail.com',
            phone: '(063)245-4444',
            dateOfBirth: '2020-10-10T00:00:00.000Z',
            about: 'Lalal lalal',
            password: 'pass'
          })
          user.save((err, user) => {
                  chai.request(server)
                  .put('/api/v1/users/' + user._id)
                  .send({name: 'new name'})
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('name').eql('new name');
                    done();
                  });
            });
        });
        it('it should UPDATE a user given the id', (done) => {
          let user  = new User({
            name: 'name',
            email: 'name@gmail.com',
            phone: '(063)245-4444',
            dateOfBirth: '2020-10-10T00:00:00.000Z',
            about: 'Lalal lalal',
            password: 'pass'
          })
          user.save((err, user) => {
                  chai.request(server)
                  .put('/api/v1/users/' + user._id)
                  .send({email: 'neqemail@gmail.com'})
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('email').eql('neqemail@gmail.com');
                    done();
                  });
            });
        });
        it('it should UPDATE a user given the id', (done) => {
          let user  = new User({
            name: 'name',
            email: 'name@gmail.com',
            phone: '(063)245-4444',
            dateOfBirth: '2020-10-10T00:00:00.000Z',
            about: 'Lalal lalal',
            password: 'pass'
          })
          user.save((err, user) => {
                  chai.request(server)
                  .put('/api/v1/users/' + user._id)
                  .send({phone: '(063)444-4444'})
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('phone').eql('(063)444-4444');
                    done();
                  });
            });
        });
        it('it should UPDATE a user given the id', (done) => {
          let user  = new User({
            name: 'name',
            email: 'name@gmail.com',
            phone: '(063)245-4444',
            dateOfBirth: '2020-10-10T00:00:00.000Z',
            about: 'Lalal lalal',
            password: 'pass'
          })
          user.save((err, user) => {
                  chai.request(server)
                  .put('/api/v1/users/' + user._id)
                  .send({dateOfBirth: '2019-10-10T00:00:00.000Z'})
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('dateOfBirth').eql('2019-10-10T00:00:00.000Z');
                    done();
                  });
            });
        });
        it('it should UPDATE a user given the id', (done) => {
          let user  = new User({
            name: 'name',
            email: 'name@gmail.com',
            phone: '(063)245-4444',
            dateOfBirth: '2020-10-10T00:00:00.000Z',
            about: 'Lalal lalal',
            password: 'pass'
          })
          user.save((err, user) => {
                  chai.request(server)
                  .put('/api/v1/users/' + user._id)
                  .send({about: 'new info'})
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('about').eql('new info');
                    done();
                  });
            });
        });
    }); 

    describe('/PUT/:id user', () => {
      it('it should UPDATE password of user by the id', (done) => {
        let user  = new User({
          name: 'name',
          email: 'name@gmail.com',
          phone: '(063)245-4444',
          dateOfBirth: '2020-10-10T00:00:00.000Z',
          about: 'Lalal lalal',
          password: '$2b$10$LV5jHPplB5b0L5jmYUq4seZcGKE0yoZp9f2C7dPK1ciFrs6pCvVAa'
        })
        user.save((err, user) =>  {
                chai.request(server)
                .put('/api/v1/users/changePassword/' + user._id)
                .send({password: 'newPassword'})
                .end( async (err, res) => {
                    let tempUser = new User(res.body);
                    if(!tempUser.comparePasswords('newPassword'))
                    {
                      return;
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('password');
                  done();
                });
          });
          
      });
    });
    describe('/DELETE/:id user', () => {
      it('it should DELETE a user given the id', (done) => {
        let user  = new User({
          name: 'name',
          email: 'name@gmail.com',
          phone: '(063)245-4444',
          dateOfBirth: '2020-10-10T00:00:00.000Z',
          about: 'Lalal lalal',
          password: 'pass'
        })
        user.save((err, user) => {
                chai.request(server)
                .delete('/api/v1/users/' + user._id)
                .end( (err, res) => {
                  //console.log(res.text);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.should.have.property('text').eql('Deleted sucessefully')
                    //res.body.should.have.property('message').eql('ddd');
                  done();
                });
          });
      });
  });
  describe('/POST user(login)', () => {
    it('it should login user', async (done) => {
      let user = new User({
        name : 'anme',
        email: 'name@gmail.com',
        password: '$2b$10$LV5jHPplB5b0L5jmYUq4seZcGKE0yoZp9f2C7dPK1ciFrs6pCvVAa'
      })
      await user.save((err) => {
        if (err) {
          return err;
        }

      });
      user.password = 'test';
      chai.request(server)
          .post('/api/v1/users/login')
          .send(user)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('token');
              res.body.should.have.property('user')
            done();
          });
    });
  });


});