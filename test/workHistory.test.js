process.env.NODE_ENV = 'test';
//const jest = require('jest');
const server = require('../server.js');
const chai = require('chai');
const chatHttp = require('chai-http');
require("dotenv").config();
const apiKey = process.env.API_KEY

chai.should();
chai.use(chatHttp);

// Users to use during test.
let user = {
    email: "test@work.com",
    password: "testtest",
    token: ""
};

let work = {
    company: "company",
    desc: "desc",
    start: "date",
    stop: "date",
    role: "role"
};

before(function() {
    describe('Register', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
            .post("/register")
            .set({api_key: apiKey})
            .send(user)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.message.should.equal("ok");
                res.body.token.should.be.an('string');
                user.token = res.body.token;
                done();
            });
        });
    });
})

after(function() {
    describe('Unegister', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
            .post("/unregister")
            .set({
                api_key: apiKey,
            })
            .send(user)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.message.should.equal("User removed");
                res.body.user.should.be.an('string');
                done();
            });
        });
    })
    server.stop();
})
function delay(interval) 
{
   return it('should delay', done => 
   {
      setTimeout(() => done(), interval);

   }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}
// wait for DB to be up.
delay(3000);


/** 
 * Test that we can create an work.
 */
describe('Create work', () => {
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
        .post("/workhistory")
        .set({
            api_key: apiKey,
            token: user.token,
        })
        .send(work)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.message.should.equal("ok");
            done();
        });
    });
});

/** 
 * Test that we get an error.
 */
describe('Error Create work', () => {
    it('should get 500', (done) => {
        chai.request(server)
        .post("/workhistory")
        .set({
            api_key: apiKey,
            token: user.token,
        })
        .send({
            desc: "desc",
            start: "date",
            stop: "date",
            role: "role"
        })
        .end((err, res) => {
            res.should.have.status(500)
            done();
        });
    });
    it('should get 500', (done) => {
        chai.request(server)
        .post("/workhistory")
        .set({
            api_key: apiKey,
            token: user.token,
        })
        .send({
            company: "company",
        })
        .end((err, res) => {
            res.should.have.status(500)
            done();
        });
    });
    it('should get 500', (done) => {
        chai.request(server)
        .post("/workhistory")
        .set({
            api_key: apiKey,
            token: user.token,
        })
        .send({
            company: "company",
            desc: "desc",
            start: "date",
            role: "role"
        })
        .end((err, res) => {
            res.should.have.status(500)
            done();
        });
    });
    it('should get 500', (done) => {
        chai.request(server)
        .post("/workhistory")
        .set({
            api_key: apiKey,
            token: user.token,
        })
        .send({
            company: "company",
            desc: "desc",
            stop: "date",
            role: "role"
        })
        .end((err, res) => {
            res.should.have.status(500)
            done();
        });
    });
});



/** 
 * Test that we can update an work.
 */
describe('Update work', () => {
    it('should get 200', (done) => {
        chai.request(server)
        .put("/workhistory")
        .set({
            api_key: apiKey,
            token: user.token,
        })
        .send({
            company: "company",
            desc: "desc",
            start: "date",
            stop: "date",
            role: "role"
        })
        .end((err, res) => {
            res.should.have.status(200)
            res.body.message.should.equal("ok");
            done();
        });
    });
});

/** 
 * Test that we get an error when updating an work.
 */
describe('fail updating work', () => {
    it('should get 500', (done) => {
        chai.request(server)
        .put("/workhistory")
        .set({
            api_key: apiKey,
            token: user.token,
        })
        .send({
            desc: "desc",
            start: "date",
            stop: "date",
            role: "role"
        })
        .end((err, res) => {
            res.should.have.status(500)
            done();
        });
    });
    it('should get 500', (done) => {
        chai.request(server)
        .put("/workhistory")
        .set({
            api_key: apiKey,
            token: user.token,
        })
        .send({
            company: "nothing",
            desc: "desc",
            start: "date",
            stop: "date",
            role: "role"
        })
        .end((err, res) => {
            res.should.have.status(500)
            done();
        });
    });
});
