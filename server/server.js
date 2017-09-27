const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

let db;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/markers', (req, res) => {
    db.collection('markers').insertMany(req.body)
        .then(function(result) {
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
app.get('/all', (req, res) => {
    db.collection('markers').find({}).toArray(function(err, results) {
        if (err) return console.log(err);
        console.log(results);
        res.send(results);
    });
});

MongoClient.connect('mongodb://konstantin_odessa:IGNATIA@ds151014.mlab.com:51014/mongo-db-test', (err, database) => {
    if (err) return console.log(err);
    db = database;
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
});

