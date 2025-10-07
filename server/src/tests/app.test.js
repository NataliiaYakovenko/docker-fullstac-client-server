const request = require('supertest');
const { expect } = require('chai');
const yap = require('yup');
const app = require('../app');

const TOKEN_VALIDATIONS_SCHEMA = yap.object({
  token: yap.string().matches(/^\w+\.\w+\.\w+$/).required(),
});

const userCredentials = { email:'creative@gmail.com', password: '123456' };


describe('Testing app', () => {
  describe('Testing public endpoint', () => {
    describe('GET /offers', () => {
      it('Response should be [] when GET /offers', (done) => {
        request(app)
          .get('/offers')
          .expect(200)
          .then(response=>{
            expect(response.body).to.be.an('array');
            done();
          })
          .catch(error=>done(error));
      });
    });

    describe('POST /login', () => {
      it('Response should be 200{token:" "} when credential is correct', (done) => {
        request(app)
          .post('/login')
          .send(userCredentials)
          .expect(200)
          .then(response=>{
            expect(TOKEN_VALIDATIONS_SCHEMA.isValidSync(response.body)).to.be.true;
            done();
          })
          .catch(error=>done(error));
      });
      it('Response should be 404 "user with this data does not exist" when user email is not correct', (done) => { 
        request(app)
          .post('/login')
          .send({ email: 'isnotcorrect@.com', password: '123456' })
          .expect(404)
          .expect('user with this data does not exist')
          .end(done);
      });
    });
  });
  describe('testing private endpoint', () => {
    let token = '';
    before((done)=>{
      request(app).post('/login').send(userCredentials)
        .then(response=>{
          const token =response.body.token;
          done();
        })
        .catch(error=>done(error));
    });
    describe('POST /getUser', () => {
      it('Response should be 200 (user) when token exists and correct', (done) => {
        request(app)
          .post('/getUser')
          .set('Authorization', '')
          .expect(200)
          .expect('Content-Type', /json/)
          .then(response=>{
            expect(response.bady.email).to.equal(userCredentials.email);
            done();
          })
          .catch(error=>done(error));
      });
    });
  });
});
