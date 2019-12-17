'use strict';
const Work = require('../models/work');
const workHistory = require('../src/workHistory');


var express = require('express');
var router = express.Router();

router.get('/', async function (req, res) {
    var workPlaces = await Work.find(function (err, docs) {
        return docs;
    });
    const data = {
        data: {
            title: "Tomas Perers | Work History",
            workPlaces: workPlaces
        }
    };

    res.json(data);
});

router.post('/', //(req, res, next) => auth.checkToken(req, res, next),
(req, res) => workHistory.add(res, req.body));

router.put('/', //(req, res, next) => auth.checkToken(req, res, next),
(req, res) => workHistory.update(res, req.body));

module.exports = router;