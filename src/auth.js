'use strict';
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
var Auth = require('../models/auth');
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const auth = {
    /*
    * Verify that the API key is correct.
    */
    checkApiKEy: async function (req, res, next) {
        let clientApiKey = req.headers.api_key;
        if (!clientApiKey || clientApiKey === undefined) {
            return res.status(400).send({
                status: false,
                response: "Missing API key"
            });
        }
        let apiKey = process.env.API_KEY;

        if (clientApiKey === apiKey) {
            next();
        } else {
            return res.status(400).send({
                status: false,
                response: "Invalid API key"
            })
        }
    },
    register: async function (res, body) {
        const email = body.email;
        const password = body.password;
        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/register",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }

        let hasedPass = await argon2.hash(password);
        let payload = { email: email };
        let jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        Auth.create({
            email: email,
            password: hasedPass
        }).then(() => {
            return res.status(200).json({
                message: "ok",
                token: jwtToken,
                user: email
            });
        }).catch(err => {
            return res.status(500).json({
                message: err
            });
        })
    },

    login: async function (res, body) {
        const email = body.email;
        const password = body.password;

        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }

        Auth.findOne({ email: email }, function (err, userInfo) {
            if (err || !userInfo) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: "/login",
                        title: "user not found",
                        detail: "user does not exist."
                    }
                });
            } else {
                argon2.verify(userInfo.password, password).then((correct) => {
                    if (correct) {
                        let payload = { email: userInfo.email };
                        let jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

                        return res.status(200).json({
                            message: "User logged in",
                            user: email,
                            token: jwtToken,
                            status: 200
                        });
                    }
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: "/login",
                            title: "Wrong password",
                            detail: "Password is incorrect."
                        }
                    });
                })
            }
        })
    },

    unregister: async function (res, body) {
        const email = body.email;
        const password = body.password;

        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }

        Auth.findOne({ email: email }, function (err, userInfo) {
            if (err || !userInfo) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: "/unregister",
                        title: "Wrong user",
                        detail: "user does not exist."
                    }
                });
            } else {
                argon2.verify(userInfo.password, password).then((correct) => {
                    if (correct) {
                        Auth.findOneAndRemove({ _id: userInfo._id }, function (err) {
                            if (err) {
                                console.log("err")
                                return res.status(500).json({
                                    errors: {
                                        status: 500,
                                        source: "/unregister",
                                        title: "DB error",
                                        detail: err
                                    }
                                });
                            }
                            return res.status(200).json({
                                message: "User removed",
                                user: email,
                                status: 200
                            });
                        });
                        return res;
                    }
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: "/unregister",
                            title: "Wrong password",
                            detail: "Password is incorrect."
                        }
                    });
                })
            }
        })
    },

    checkToken: function (req, res, next) {
        console.log('============== Check Token ======================');
        console.log(req.headers);
        console.log('====================================');
        var token = req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, jwtSecret, function (err, decoded) {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: req.path,
                            title: "Failed authentication",
                            detail: err.message
                        }
                    });
                }

                req.user = {};
                req.user.email = decoded.email;

                next();

                return undefined;
            });
        } else {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: req.path,
                    title: "No token",
                    detail: "No token provided in request headers"
                }
            });
        }
    }

}

module.exports = auth;