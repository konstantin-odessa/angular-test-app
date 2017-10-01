'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const jwt = require('express-jwt');
const cors = require('cors');

const app = express();

let db;
const MONGO_DB_AUTH_URL = 'mongodb://konstantin_odessa:IGNATIA@ds151014.mlab.com:51014/mongo-db-test';
const AUTH0_SECRET = 'ogCpx0wwmymrJO812syBWhrY4SHSYJMGfzePdYUoYxnvsFB4-qyritLVTW3iH2eb';

const authCheck = jwt({
    secret: new Buffer(AUTH0_SECRET, 'base64'),
    audience: 'https://konstantin-odessa.eu.auth0.com/userinfo',
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.post('/markers', (req, res) => {
    db.collection('markers').insertMany(req.body)
        .then(function (result) {
            console.log(result);
            console.log('saved to database');
            res.send({success: true});
        });

    // db.collection('markers').save(req.body, (err, result) => {
    //     console.log(req.body);
    //     if (err) return console.log(err);
    //     // console.log(result.body);
    //     console.log('saved to database');
    //     // res.redirect('/')
    //     res.send({success: true});
    // })

});
app.get('/all', authCheck, (req, res) => {
    db.collection('markers').find({}).toArray(function (err, results) {
        if (err) return console.log(err);
        console.log(results);
        res.send(results);
    });
});

MongoClient.connect(MONGO_DB_AUTH_URL, (err, database) => {
    if (err) return console.log(err);
    db = database;
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
});

