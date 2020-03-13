"use strict";
var Skills = require("../models/skills");
const competence = require("../src/competence");
const auth = require("../src/auth");

var express = require("express");
var router = express.Router();

router.get("/", async function(req, res) {
  if (!req.query.name) {
    return res.status(400).send({
      status: false,
      response: "name or skill missing"
    });
  }
  var skills = await Skills.find({ name: req.query.name }, function(err, docs) {
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
    return docs;
  });
  if (skills.length) {
    const data = {
      data: {
        title: "Tomas Perers |Competence",
        skills: skills
      }
    };
    res.json(data);
  } else {
    res.status(500).json({
      errors: {
        status: 500,
        source: "/",
        title: "DB error",
        detail: "Nothing found"
      }
    });
  }
});

router.post(
  "/",
  (req, res, next) => auth.checkToken(req, res, next),
  (req, res) => competence.add(res, req.body)
);

router.put(
  "/",
  (req, res, next) => auth.checkToken(req, res, next),
  (req, res) => competence.update(res, req.body)
);

module.exports = router;
