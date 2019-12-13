process.env.NODE_ENV = 'test';
//const jest = require('jest');
const server = require('../server.js');
const chai = require('chai');
const chatHttp = require('chai-http');

chai.should();
chai.use(chatHttp);

after(function() {
    server.stop();
})



describe('/', () => {
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
        .get("/")
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.data.should.be.an("object");
            res.body.data.title.should.be.a("string");
            res.body.data.about.should.be.an("object");
            res.body.data.about.name.should.be.a("string");
            res.body.data.about.description.should.be.a("string");
            res.body.data.about.location.should.be.a("string");
            res.body.data.about.interest.should.be.a("string");
            res.body.data.msg.should.be.a("string");
            done();
        });
    });
});

describe('/competence', () => {
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
        .get("/competence")
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
