process.env.NODE_ENV = 'test';
//const jest = require('jest');
const server = require('../server.js');
const chai = require('chai');
const chatHttp = require('chai-http');
require("dotenv").config();
const apiKey = process.env.API_KEY

chai.should();
chai.use(chatHttp);

after(function() {
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


describe('/', () => {
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
        .get("/")
        .set({api_key: apiKey})
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});

describe('/', () => {
    it('should get 400 missing API KEY', (done) => {
        chai.request(server)
        .get("/")
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an("object");
            res.body.status.should.equal(false);
            res.body.response.should.be.a("string");
            res.body.response.should.equal("Missing API key");
            done();
        });
    });
});

describe('/', () => {
    it('should get 400 invalid API KEY', (done) => {
        chai.request(server)
        .get("/")
        .set({api_key: "asdfasdfsa"})
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an("object");
            res.body.status.should.equal(false);
            res.body.response.should.be.a("string");
            res.body.response.should.equal("Invalid API key");
            done();
        });
    });
});

describe('/competence', () => {
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
        .get("/competence")
        .set({api_key: apiKey})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.data.should.be.an("object");
            res.body.data.title.should.be.a("string");
            res.body.data.skills.should.be.a("array");
            done();
        });
    });
});

describe('/workHistory', () => {
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
        .get("/workHistory")
        .set({api_key: apiKey})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.data.should.be.an("object");
            res.body.data.title.should.be.a("string");
            res.body.data.workPlaces.should.be.a("array");
            done();
        });
    });
});

describe('/login', () => {
    it('should get 401 Email or password missing', (done) => {
        chai.request(server)
        .post("/login")
        .set({api_key: apiKey})
        .end((err, res) => {
            res.should.have.status(401);
            res.body.errors.detail.should.equal("Email or password missing in request");
            done();
        });
    });
});

describe('/register', () => {
    it('should get 401 Email or password missing', (done) => {
        chai.request(server)
        .post("/register")
        .set({api_key: apiKey})
        .end((err, res) => {
            res.should.have.status(401);
            res.body.errors.detail.should.equal("Email or password missing in request");
            done();
        });
    });
});

describe('Create user and login', () => {
    let user = {
        email: "test@example.com",
        password: "testtest",
    };
    let falseUser = {
        email: "test@example.com",
        password: "testtest12313213",
    };
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
                done();
            });
        });
    })
    describe('Login', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
            .post("/login")
            .set({api_key: apiKey})
            .send(user)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.message.should.equal("User logged in");
                res.body.token.should.be.an('string');
                done();
            });
        });
    })
    
    describe('Unegister', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
            .post("/unregister")
            .set({api_key: apiKey})
            .send(user)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.message.should.equal("User removed");
                res.body.user.should.be.an('string');
                done();
            });
        });
    })
});

describe('Unregister user not existing', () => {
    let user = {
        email: "test@example.com",
        password: "testtest",
    };
    describe('Unegister', () => {
        it('should get 401', (done) => {
            chai.request(server)
            .post("/unregister")
            .set({api_key: apiKey})
            .send(user)
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.an("object")
                res.body.errors.should.be.an("object")
                done();
            });
        });
    })
});

// Need to create about first.

// describe('/', () => {
//     it('should get 200 HAPPY PATH', (done) => {
//         chai.request(server)
//         .get("/")
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.an("object");
//             res.body.data.should.be.an("object");
//             res.body.data.title.should.be.a("string");
//             res.body.data.about.should.be.an("object");
//             res.body.data.about.name.should.be.a("string");
//             res.body.data.about.description.should.be.a("string");
//             res.body.data.about.location.should.be.a("string");
//             res.body.data.about.interest.should.be.a("string");
//             res.body.data.msg.should.be.a("string");
//             done();
//         });
//     });
// });