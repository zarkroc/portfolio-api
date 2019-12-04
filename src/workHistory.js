'use strict';
var Work = require('../models/work');

const workHistory = {
    add: async function (res, body) {
        About.create({
            company: body.company,
            description: body.desc,
            start: body.start,
            stop: body.stop,
            role: body.role
        })
    },
    update: async function (res, body) {
        About.findOne({company: body.company}).then((res, err) => {
            res.company = body.company;
            res.description = body.desc;
            res.start = body.start;
            res.stop = body.stop;
            res.role = body.role
            res.save();
        })
    }
}

module.exports = workHistory;