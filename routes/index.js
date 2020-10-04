"use strict";
var About = require("../models/about");

var express = require("express");
var router = express.Router();
var about = require("../src/about");
var auth = require("../src/auth");

router.get("/", async function(req, res) {
  if (req.query.name) {
    var about = await About.findOne({ name: req.query.name }).then(
      (res, err) => {
        if (err) {
          return res.status(500).json({
            errors: {
              status: 500,
              source: "/",
              title: "DB error",
              detail: "Internal error with DB"
            }
          });
        }
        return res;
      }
    );
    if (about) {
      const data = {
        data: {
          title: "Tomas Perers |CV",
          about: about
        }
      };
      res.json(data);
    } else {
      res.status(404).json({
        errors: {
          status: 404,
          source: "/",
          title: "Not found",
          detail: "User not found"
        }
      });
    }
  } else {
    var about = await About.find().then((res,err) =>  {
      if (err) {
        return res.status(500).json({
          errors: {
            status: 500,
            source: "/",
            title: "DB error",
            detail: "Internal error with DB"
          }
        });
      }
      return res;
    })
    console.log(about);
    return res.json({
      title: "Users",
      users: about
    })
  }
});

router.post(
  "/",
  (req, res, next) => auth.checkToken(req, res, next),
  (req, res) => about.add(res, req.body)
);

router.put(
  "/",
  (req, res, next) => auth.checkToken(req, res, next),
  (req, res) => about.update(res, req.body)
);

module.exports = router;
