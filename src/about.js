'use strict';
var About = require('../models/about');

const about = {
    add: async function (res, body) {
        About.create({
            name: body.name,
            description: body.description,
            location: body.homeTown,
            interest: body.interest,
        }).then(() => {
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
        let user = await About.findOne({ _id: body.id }).then((res, err) => {
            if (err) {
                return res.status(500).json({
                    message: err
                });
            }
            return res;
        });
        if (user) {
            user.name = body.name;
            user.description = body.description;
            user.location = body.homeTown;
            user.interest = body.interest;

            user.save().then(() => {
                return res.status(200).json({
                    message: "ok"
                });
            }).catch(err => {
                return res.status(500).json({
                    message: err
                });
            })

        } else {
            return res.status(500).json({
                message: "fail"
            });
        }
    }
}

module.exports = about;