const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

let db;

MongoClient.connect('mongodb://konstantin_odessa:IGNATIA@ds151014.mlab.com:51014/mongo-db-test', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
});

app.use(bodyParser.urlencoded({extended: true}));


app.post('/markers', (req, res) => {
    db.collection('markers').save(req.body, (err, result) => {
        if (err) return console.log(err);
        // console.log(result);
        console.log('saved to database');
        res.redirect('/')
    })
});