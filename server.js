const Routes = require('./api/v1/routes');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const config = require('./api/config/config');

const dev = require('./api/config/dev');
const test = require('./api/config/test');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'test') {
    mongoose.connect(test.DBHost, { useNewUrlParser: true });
}
if (process.env.NODE_ENV === 'dev') {
    mongoose.connect(dev.DBHost, { useNewUrlParser: true });
}

app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
    secret: config.SERVER_SECRET,
    resave: false,
    saveUninitialized: true
  }));

// let dbName = 'userdb';
// if (process.env.NODE_ENV === 'test') dbName = 'testUserdb';
// if (process.env.NODE_ENV === 'prod') dbName = 'userdb';
//mongoose.connect(config.DB_URL + dbName,{ useNewUrlParser: true });

app.use('/api/v1', Routes);

if (!module.parent) {
    app.listen(8080, () => {
        console.log('Started at 8080.');
    });
 }

module.exports = app;
