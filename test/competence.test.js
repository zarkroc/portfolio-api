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
let skillUser = {
    email: "test@skill.com",
    password: "testtest",
};

let skill = {
    name: "test",
    level: 1
};

var token;


before(function() {
    describe('Register', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
            .post("/register")
            .set({api_key: apiKey})
            .send(skillUser)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.message.should.equal("ok");
                res.body.token.should.be.an('string');
                token = res.body.token;
                // wait for DB to be up.
                delay(3000);
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


after(function () {
    describe('Unegister', () => {
        describe('Register', () => {
            it('should get 200 HAPPY PATH', (done) => {
                chai.request(server)
                    .post("/register")
                    .set({ api_key: apiKey })
                    .send(skillUser)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.message.should.equal("ok");
                        res.body.token.should.be.an('string');
                        token = res.body.token;
                        delay(3000);
                        console.log("REGISTER REGISTER REGISTER");
                        console.log(token);
                        console.log("REGISTER REGISTER REGISTER");
                        done();
                    });
            });
        });
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/login")
                .set({ api_key: apiKey })
                .send(skillUser)
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
                .send(skillUser)
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
 * Test that we can create an skill.
 */
describe('Create skill', () => {
    describe('Register', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/register")
                .set({ api_key: apiKey })
                .send(skillUser)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.message.should.equal("ok");
                    res.body.token.should.be.an('string');
                    token = res.body.token;
                    delay(3000);
                    console.log("REGISTER REGISTER REGISTER");
                    console.log(token);
                    console.log("REGISTER REGISTER REGISTER");
                    done();
                });
        });
    });
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
            .post("/login")
            .set({ api_key: apiKey })
            .send(skillUser)
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
        .post("/competence")
        .set({
            api_key: apiKey,
            "x-access-token": token,
        })
        .send(skill)
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
describe('Error Create skill', () => {
    describe('Register', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/register")
                .set({ api_key: apiKey })
                .send(skillUser)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.message.should.equal("ok");
                    res.body.token.should.be.an('string');
                    token = res.body.token;
                    delay(3000);
                    console.log("REGISTER REGISTER REGISTER");
                    console.log(token);
                    console.log("REGISTER REGISTER REGISTER");
                    done();
                });
        });
    });
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
            .post("/login")
            .set({ api_key: apiKey })
            .send(skillUser)
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
        .post("/competence")
        .set({
            api_key: apiKey,
            "x-access-token": token,
        })
        .send({
            level: 1,
        })
        .end((err, res) => {
            res.should.have.status(500)
            done();
        });
    });
});



/** 
 * Test that we can update an skill.
 */
describe('Update skill', () => {
    describe('Register', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/register")
                .set({ api_key: apiKey })
                .send(skillUser)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.message.should.equal("ok");
                    res.body.token.should.be.an('string');
                    token = res.body.token;
                    delay(3000);
                    console.log("REGISTER REGISTER REGISTER");
                    console.log(token);
                    console.log("REGISTER REGISTER REGISTER");
                    done();
                });
        });
    });
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
            .post("/login")
            .set({ api_key: apiKey })
            .send(skillUser)
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
        .put("/competence")
        .set({
            api_key: apiKey,
            "x-access-token": token,
        })
        .send(
            skill
        )
        .end((err, res) => {
            res.should.have.status(200)
            res.body.message.should.equal("ok");
            done();
        });
    });
});

/** 
 * Test that we get an error when updating an skill.
 */
describe('fail updating skill', () => {
    describe('Register', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/register")
                .set({ api_key: apiKey })
                .send(skillUser)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.message.should.equal("ok");
                    res.body.token.should.be.an('string');
                    token = res.body.token;
                    delay(3000);
                    console.log("REGISTER REGISTER REGISTER");
                    console.log(token);
                    console.log("REGISTER REGISTER REGISTER");
                    done();
                });
        });
    });
    it('should get 200 HAPPY PATH', (done) => {
        chai.request(server)
            .post("/login")
            .set({ api_key: apiKey })
            .send(skillUser)
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
        .put("/competence")
        .set({
            api_key: apiKey,
            "x-access-token": token,
        })
        .send({
            level: "Interst",
        })
        .end((err, res) => {
            res.should.have.status(500)
            done();
        });
    });
    it('should get 500', (done) => {
        chai.request(server)
        .put("/competence")
        .set({
            api_key: apiKey,
            "x-access-token": token,
        })
        .send({
            level: 2
        })
        .end((err, res) => {
            res.should.have.status(500)
            done();
        });
    });
    it('should get 500', (done) => {
        chai.request(server)
        .put("/competence")
        .set({
            api_key: apiKey,
            "x-access-token": token,
        })
        .send({
            name: "Interst",
        })
        .end((err, res) => {
            res.should.have.status(500)
            done();
        });
    });
});
