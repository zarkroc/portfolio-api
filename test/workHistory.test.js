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
};

let work = {
    company: "company",
    desc: "desc",
    start: "date",
    stop: "date",
    role: "role"
};
var token;

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
                token = res.body.token;
                done();
            });
        });
    });
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

after(function () {
    describe('Unegister', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/login")
                .set({ 
                    api_key: apiKey 
                })
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.message.should.equal("User logged in");
                    res.body.token.should.be.an('string');
                    token = res.body.token;
                    done();
                });
        });
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/unregister")
                .set({
                    api_key: apiKey,
                    "x-access-token": token,
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


/** 
 * Test that we can create an work.
 */
describe('Create work', () => {
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
            .post("/login")
            .set({ api_key: apiKey })
            .send(user)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.message.should.equal("User logged in");
                res.body.token.should.be.an('string');
                token = res.body.token;
                done();
            });
    });
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
        .post("/workhistory")
        .set({
            api_key: apiKey,
            "x-access-token": token,
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
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
            .post("/login")
            .set({ api_key: apiKey })
            .send(user)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.message.should.equal("User logged in");
                res.body.token.should.be.an('string');
                token = res.body.token;
                done();
            });
    });
    it('should get 500', (done) => {
        chai.request(server)
        .post("/workhistory")
        .set({
            api_key: apiKey,
            "x-access-token": token,
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
            "x-access-token": token,
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
            "x-access-token": token,
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
            "x-access-token": token,
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
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
            .post("/login")
            .set({ api_key: apiKey })
            .send(user)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.message.should.equal("User logged in");
                res.body.token.should.be.an('string');
                token = res.body.token;
                done();
            });
    });
    it('should get 200', (done) => {
        chai.request(server)
        .put("/workhistory")
        .set({
            api_key: apiKey,
            "x-access-token": token,
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
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
            .post("/login")
            .set({ api_key: apiKey })
            .send(user)
            .end((err, res) => {
                console.log('====================================');
                console.log("what am I doing here");
                console.log(res.body)
                console.log('====================================');
                res.should.have.status(200)
                res.body.message.should.equal("User logged in");
                res.body.token.should.be.an('string');
                token = res.body.token;
                console.log('====================================');
                console.log(token);
                console.log('====================================');
                done();
            });
    });
    it('should get 500', (done) => {
        chai.request(server)
        .put("/workhistory")
        .set({
            api_key: apiKey,
            "x-access-token": token,
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
        console.log(token);
        
        chai.request(server)
        .put("/workhistory")
        .set({
            api_key: apiKey,
            "x-access-token": token,
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
