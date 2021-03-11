'use strict'
var port = 1337
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const index = require('./routes/index.js')
const competence = require('./routes/competence.js')
const workHistory = require('./routes/workHistory.js')
const auth = require('./src/auth.js')
require('dotenv').config()
var mongoose = require('mongoose')

const app = express()
const router = express.Router()

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
const mongoHost = process.env.MONGO_HOST

var corsOptions

if (process.env.NODE_ENV == 'production') {
  mongoose
  .connect(`mongodb://${mongoHost}:27017/tomas`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch(function (e) {
    console.error('Failed to connect to mongo')
  })
  corsOptions = {
    origin: 'https://tomas.perers.org',
    optionSucessStatus: 200,
  }
} else {
  port = 3333
  mongoose
  .connect(`mongodb://${mongoHost}:27017/tomas-test`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch(function (e) {
    console.error('Failed to connect to mongo')
  })
  corsOptions = {
    origin: [
      'https://tomas.perers.org',
      'http://localhost:1337',
      'http://localhost:8080',
      'http://tomas.perers.org',
    ],
    optionSucessStatus: 200,
  }
}

app.use(cors(corsOptions))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
  // use morgan to log at command line
  app.use(morgan('combined')) // 'combined' outputs the Apache style LOGs
}
app.use(auth.checkApiKEy)

router.use('/', index)
router.use('/competence', competence)
router.use('/workhistory', workHistory)
router.post('/login', (req, res) => auth.login(res, req.body))
router.post('/register', (req, res) => auth.register(res, req.body))
router.post(
  '/unregister',
  (req, res, next) => auth.checkToken(req, res, next),
  (req, res) => auth.unregister(res, req.body)
)

app.use('/', router)

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
  var err = new Error('Not Found')

  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  res.status(err.status || 500).json({
    errors: {
      status: err.status,
      title: err.message,
      detail: err.message,
    },
  })
})
// Start up server
const server = app.listen(port, () => {
  console.log(`Tomas API listening on port ${port}!`)
  console.log(process.env.NODE_ENV)
}
)

function stop() {
  server.close()
  mongoose.disconnect()
}

process.on('exit', (code) => {
  server.close()
  mongoose.disconnect()
  console.log(`Shutting down with code: ${code}`)
})

process.on('SIGINT', function () {
  console.log('Caught interrupt signal')
  process.exit()
})

module.exports = server
module.exports.stop = stop
