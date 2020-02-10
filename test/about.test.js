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
let aboutUser = {
    email: "test@about.com",
    password: "testtest",
};

let about = {
    description: "test",
    homeTown: "testtown",
    interest: "Interst",
    name: "testname"
};
var userUpdate;

var token;

function register() {
    return it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
            .post("/register")
            .set({ api_key: apiKey })
            .send(aboutUser)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.message.should.equal("ok");
                res.body.token.should.be.an('string');
                token = res.body.token;
                done();
            });
    });
}

function unregister() {
    return describe('Unegister', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/login")
                .set({ api_key: apiKey })
                .send(aboutUser)
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
                .send(aboutUser)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.message.should.equal("User removed");
                    res.body.user.should.be.an('string');
                    done();
                });
        });
    })
}

function delay(interval) {
    return it('should delay', done => {
        setTimeout(() => done(), interval);

    }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}

delay(3000);

after(function () {
    unregister();
    server.stop();
})


/** 
 * Test that we can create an about.
 */
describe('Create about', () => {
    register();
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
    unregister();
});

/** 
 * Test that we get an error.
 */
describe('Error Create about', () => {
    register();
    it('should get 500', (done) => {
        chai.request(server)
            .post("/")
            .set({
                api_key: apiKey,
                "x-access-token": token,
            })
            .send({
                description: "test",
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
                description: "test",
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
                description: "test",
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
    unregister();
});



/** 
 * Test that we can update an about.
 */
describe('Update about', () => {
    register();
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
            .get("/")
            .set({ api_key: apiKey })
            .send({ name: about.name })
            .end((err, res) => {
                res.should.have.status(200);
                userUpdate = res.body.data.about;
                done();
            });
    });
    it('should get 200', (done) => {
        console.log(userUpdate)
        chai.request(server)
            .put("/")
            .set({
                api_key: apiKey,
                "x-access-token": token,
            })
            .send({
                description: "test",
                homeTown: "testtown",
                interest: "Interst",
                name: "testname",
                id: userUpdate._id
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.message.should.equal("ok");
                done();
            });
    });
    unregister();
});

/** 
 * Test that we get an error when updating an about.
 */
describe('fail updating about', () => {
    register();
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
                description: "test"
            })
            .end((err, res) => {
                res.should.have.status(500)
                done();
            });
    });
    unregister();
});
