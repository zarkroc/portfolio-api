'use strict';
const port = 1337;
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const index = require('./routes/index.js');
const competence = require('./routes/competence.js');
const workHistory = require('./routes/workHistory.js');
const auth = require('./src/auth.js');
var mongoose = require('mongoose');

const app = express();
const router = express.Router();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/tomas', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch(function(e){
    console.error("Failed to connect to mongo");
});


app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

router.use('/', index);
router.use('/competence', competence);
router.use('/workHistory', workHistory);
router.post('/login', (req, res) => auth.login(res, req.body));
router.post('/register', (req, res) => auth.register(res, req.body));

app.use('/', router);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title": err.message,
                "detail": err.message
            }
        ]
    });
});
// Start up server
const server = app.listen(port, () => console.log(`Tomas API listening on port ${port}!`));

function stop() {
    server.close();
    mongoose.disconnect();
}

module.exports = server;
module.exports.stop = stop;