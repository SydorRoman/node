//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const server = require('../../server');
const User = require('../v1/models/user');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const user = {
  name: 'name',
  password: '123',
  email: 'name@gmail.com',
  phone: '(063)245-4444',
  dateOfBirth: '2020-10-10T00:00:00.000Z',
  about: 'Lalal lalal' 
}

describe('User',() => {
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

    await userT.save();
    
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


  describe('/POST user', () => {
    it('it should not POST a user without name field', (done) => {
      delete user.name;
      chai.request(server)
        .post('/api/v1/auth/registration')
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
        .post('/api/v1/auth/registration')
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
        .post('/api/v1/auth/registration')
        .send(user)
        .end((err, res) => {
          //console.log(2,res.body);
          res.should.have.status(422);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should Post a new User', (done) => {
      let userPost = {
        name: 'name',
        email: 'name1238@gmail.com',
        phone: '(063)245-4444',
        dateOfBirth: '2020-10-10T00:00:00.000Z',
        about: 'Lalal lalal',
        password: 'pass'
      }
      chai.request(server)
        .post('/api/v1/auth/registration')
        .send(userPost)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.user.should.have.property('name');
          res.body.user.should.have.property('email');
          res.body.user.should.have.property('password');
          done();
        })
    });
  });

  describe('/PUT/:id user',async () => {
    

    it('it should UPDATE email of user by the id', (done) => {
     
      userT.save((err, userT) => { 
        chai.request(server)
          .put('/api/v1/auth/changeEmail/' + userT._id)
          .set('Authorization', `Bearer ${token}`)
          .send({ email: 'newEmail@gmail.com' })
          .end(async (err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('email');
            done();
          });
      });
    });
  });

  describe('/PUT/:id user', () => {
    it('it should UPDATE password of user by the id', (done) => {
      userT.save((err, userT) => {
        chai.request(server)
          .put('/api/v1/auth/changePassword/' + userT._id)
          .set('Authorization', `Bearer ${token}`)
          .send({ password: 'newPassword' })
          .end(async (err, res) => {
            let tempUser = new User(res.body);
            if (!tempUser.comparePasswords('newPassword')) {
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

  describe('/POST user(login)', () => {
    it('it should login user', async (done) => {
      const user = new User({
        name: 'anme',
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
        .post('/api/v1/auth/login')
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
