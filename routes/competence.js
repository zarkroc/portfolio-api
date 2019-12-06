'use strict';
var Skills = require('../models/skills');
const competence = require('../src/competence');


var express = require('express');
var router = express.Router();

router.get('/', async function (req, res) {
    var skills = await Skills.find(function (err, docs) {
        if(err){
            return {}
        }
         return docs;
    });
   
    const data = {
        data: {
            title: "Tomas Perers |Competence",
            skills: skills,
        }
    };

    res.json(data);
});

router.post('/add', //(req, res, next) => auth.checkToken(req, res, next),
(req, res) => competence.add(res, req.body));

router.put('/add', //(req, res, next) => auth.checkToken(req, res, next),
(req, res) => competence.update(res, req.body));

module.exports = router;