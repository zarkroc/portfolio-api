'use strict';
var About = require('../models/about');

var express = require('express');
var router = express.Router();
var about = require('../src/about');
var auth = require('../src/auth');

router.get('/', async function (req, res) {
    var about = await About.findOne({ name: req.body.name }).then((res, err) => {
        if (err) {
            return null;
        }
        return res;
    }).catch()
    const data = {
        data: {
            title: "Tomas Perers |CV",
            about: about,
        }
    };
    res.json(data);
});

router.post('/', (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => about.add(res, req.body));

router.put('/', (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => about.update(res, req.body));

module.exports = router;