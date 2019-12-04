'use strict';
var Skills = require('../models/skills');

const competence = {
    add: async function (res, body) {
        Skills.create({
            name: body.name,
            level: body.level,
        })
    },
    update: async function (res, body) {
        Skills.findOne({name: body.name}).then((res, err) => {
            res.name = body.name;
            res.level = body.level
            res.save();
        })
    }
}

module.exports = competence;