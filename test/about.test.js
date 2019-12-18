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
    email: "test@about.com",
    password: "testtest",
};

let about = {
    desc: "test",
    homeTown: "testtown",
    interest: "Interst",
    name: "testname"
};

var token;

before(function () {
    describe('Register', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/register")
                .set({ api_key: apiKey })
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

after(function () {
    describe('Unegister', () => {
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
 * Test that we can create an about.
 */
describe('Create about', () => {
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
            .post("/")
            .set({
                api_key: apiKey,
                "x-access-token": token,
            })
            .send(about)
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
describe('Error Create about', () => {
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
            .post("/")
            .set({
                api_key: apiKey,
                "x-access-token": token,
            })
            .send({
                desc: "test",
            })
            .end((err, res) => {
                res.should.have.status(500)
                done();
            });
    });
    it('should get 500', (done) => {
        chai.request(server)
            .post("/")
            .set({
                api_key: apiKey,
                "x-access-token": token,
            })
            .send({
                desc: "test",
                homeTown: "testtown",
            })
            .end((err, res) => {
                res.should.have.status(500)
                done();
            });
    });
    it('should get 500', (done) => {
        chai.request(server)
            .post("/")
            .set({
                api_key: apiKey,
                "x-access-token": token,
            })
            .send({
                desc: "test",
                homeTown: "testtown",
                interest: "Interst",
            })
            .end((err, res) => {
                res.should.have.status(500)
                done();
            });
    });
    it('should get 500', (done) => {
        chai.request(server)
            .post("/")
            .set({
                api_key: apiKey,
                "x-access-token": token,
            })
            .send({
                homeTown: "testtown",
                interest: "Interst",
                name: "testname"
            })
            .end((err, res) => {
                res.should.have.status(500)
                done();
            });
    });
});



/** 
 * Test that we can update an about.
 */
describe('Update about', () => {
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
            .put("/")
            .set({
                api_key: apiKey,
                "x-access-token": token,
            })
            .send({
                desc: "test",
                homeTown: "testtown",
                interest: "Interst",
                name: "testname"
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.message.should.equal("ok");
                done();
            });
    });
});

/** 
 * Test that we get an error when updating an about.
 */
describe('fail updating about', () => {
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
            .put("/")
            .set({
                api_key: apiKey,
                "x-access-token": token,
            })
            .send({
                interest: "Interst",
            })
            .end((err, res) => {
                res.should.have.status(500)
                done();
            });
    });
    it('should get 500', (done) => {
        chai.request(server)
            .put("/")
            .set({
                api_key: apiKey,
                "x-access-token": token,
            })
            .send({
                desc: "test"
            })
            .end((err, res) => {
                res.should.have.status(500)
                done();
            });
    });
});
