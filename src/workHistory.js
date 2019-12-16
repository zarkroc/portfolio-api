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
        Work.findOne({company: body.company}).then((work, err) => {
            if(err) {
                return res.status(500).send({
                    status: false,
                    response: "failed to find place of work"
                });
            }
            work.company = body.company;
            work.description = body.desc;
            work.start = body.start;
            work.stop = body.stop;
            work.role = body.role
            work.save();
            return res.status(200).json({
                message: "ok"
            });
        })
    }
}

module.exports = workHistory;