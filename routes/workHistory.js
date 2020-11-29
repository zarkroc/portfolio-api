'use strict'
const Work = require('../models/work')
const workHistory = require('../src/workHistory')
const auth = require('../src/auth')

var express = require('express')
var router = express.Router()

router.get('/', async function (req, res) {
  var workPlaces = await Work.find(
    { name: req.query.name },
    function (err, docs) {
      if (err) {
        return res.status(500).json({
          errors: {
            status: 500,
            source: '/',
            title: 'DB error',
            detail: 'Internal error with DB',
          },
        })
      }
      return docs
    }
  )
  if (workPlaces.length) {
    res.json(workPlaces)
  } else {
    res.status(404).json({
      errors: {
        status: 404,
        source: '/',
        title: 'DB error',
        detail: 'Nothing found',
      },
    })
  }
})

router.post(
  '/',
  (req, res, next) => auth.checkToken(req, res, next),
  (req, res) => workHistory.add(res, req.body)
)

router.put(
  '/',
  (req, res, next) => auth.checkToken(req, res, next),
  (req, res) => workHistory.update(res, req.body)
)

module.exports = router
