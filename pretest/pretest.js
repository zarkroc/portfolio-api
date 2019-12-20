const Auth = require('../models/auth.js');
require("dotenv").config();
var mongoose = require('mongoose');

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const mongoHost = process.env.MONGO_HOST;

mongoose.connect(`mongodb://${mongoHost}:27017/tomas`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch(function (e) {
    console.error("Failed to connect to mongo");
});

async function createUser() {
    let skillUser = {
        email: "test@skill.com",
        password: await argon2.hash("testtest"),
    };
    let aboutUser = {
        email: "test@about.com",
        password: await argon2.hash("testtest"),
    };
    let workUser = {
        email: "test@work.com",
        password: await argon2.hash("testtest"),
    };

    Auth.create(workUser).then(() => {
        console.log("created work");
    }).catch(err => {
        console.log(err);
    });
    
    Auth.create(aboutUser).then(() => {
        console.log("created work")
    }).catch(err => {
        console.log(err);;
    })
    
    Auth.create(skillUser).then(() => {
        console.log("created work")
    }).catch(err => {
        console.log(err);;
    })
    mongoose.disconnect();
}

createUser();

