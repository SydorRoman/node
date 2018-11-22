const Routes = require('./api/v1/Routes');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
  
mongoose.Promise = global.Promise;

let dbName = 'userdb';
if (process.env.NODE_ENV === 'test') dbName = 'testUserdb';

if (process.env.NODE_ENV === 'prod') dbName = 'userdb';



app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));
  
mongoose.connect(`mongodb://localhost:27017/${dbName}`,{ useNewUrlParser: true });

app.use('/api/v1', Routes);

if(!module.parent) {
    app.listen(8080, () => {
        console.log('Started at 8080.');
    });
 }

// app.listen(8080, () => {
//     console.log('Started at 8080.');
// });

module.exports = app;
