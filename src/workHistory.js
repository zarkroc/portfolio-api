'use strict';
var Work = require('../models/work');

const workHistory = {
    add: async function (res, body) {
        Work.create({
            company: body.company,
            description: body.desc,
            start: body.start,
            stop: body.stop,
            role: body.role
        })
    },
    update: async function (res, body) {
        Work.findOne({company: body.company}).then((res, err) => {
            if(err) {
                return res.status(500).send({
                    status: false,
                    response: "failed to find place of work"
                });
            }
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