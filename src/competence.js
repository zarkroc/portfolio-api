'use strict';
var Skills = require('../models/skills');

const competence = {
    add: async function (res, body) {
        Skills.create({
            name: body.name,
            level: body.level,
        })
        .then(() => {
            return res.status(200).json({
                message: "ok"
            });
        }).catch(err => {
            return res.status(500).json({
                message: err
            })
        })
    },
    update: async function (res, body) {
        Skills.findOne({name: body.name}).then((skill, err) => {
            if(err) {
                return res.status(500).send({
                    status: false,
                    response: "failed to find skill"
                });
            }
            skill.name = body.name;
            skill.level = body.level
            skill.save();
            return res.status(200).json({
                message: "ok"
            });
        })
    }
}

module.exports = competence;