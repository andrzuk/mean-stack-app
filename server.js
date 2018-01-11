var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var connection = require('./config/db.js');

var ObjectID = require('mongodb').ObjectID;

Object.assign = require('object-assign');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('combined'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.get('/templates/:name', function (req, res) {
    res.sendFile(__dirname + '/templates/' + req.params.name + '.html');
});

app.get('/api/subpage/:index', function (req, res) {
    connection.db.collection('pages', function (err, collection) {
        collection.findOne({
            index: req.params.index
        }, function (err, result) {
            res.send(result);
        });
    });
});

app.get('/api/pages', function (req, res) {
    connection.db.collection('pages', function (err, collection) {
        collection.find().toArray(function (err, result) {
            res.send(result);
        });
    });
});

app.get('/api/page/:id', function (req, res) {
    connection.db.collection('pages', function (err, collection) {
        collection.findOne({
            _id: new ObjectID(req.params.id)
        }, function (err, result) {
            res.send(result);
        });
    });
});

app.post('/api/page', function (req, res) {
    connection.db.collection('pages').insertOne({
        index: req.body.index,
        title: req.body.title,
        description: req.body.description,
        ip: req.body.ip,
        date: Date.now()
    }, function (err, result) {
        res.send(result);
    });
});

app.put('/api/page/:id', function (req, res) {
    connection.db.collection('pages').updateOne({
        _id: new ObjectID(req.params.id)
    }, {
        $set: {
            index: req.body.index,
            title: req.body.title,
            description: req.body.description,
            ip: req.body.ip,
            date: Date.now()
        }
    }, function (err, result) {
        res.send(result);
    });
});

app.delete('/api/page/:id', function (req, res) {
    connection.db.collection('pages').removeOne({
        _id: new ObjectID(req.params.id)
    }, function (err, result) {
        res.send(result);
    });
});

app.get('/api/todos', function (req, res) {
    connection.db.collection('todos', function (err, collection) {
        collection.find().toArray(function (err, result) {
            res.send(result);
        });
    });
});

app.get('/api/todo/:id', function (req, res) {
    connection.db.collection('todos', function (err, collection) {
        collection.findOne({
            _id: new ObjectID(req.params.id)
        }, function (err, result) {
            res.send(result);
        });
    });
});

app.post('/api/todo', function (req, res) {
    connection.db.collection('todos').insertOne({
        text: req.body.text,
        ip: req.body.ip,
        date: Date.now()
    }, function (err, result) {
        res.send(result);
    });
});

app.put('/api/todo/:id', function (req, res) {
    connection.db.collection('todos').updateOne({
        _id: new ObjectID(req.params.id)
    }, {
        $set: {
            text: req.body.text,
            ip: req.body.ip,
            date: Date.now()
        }
    }, function (err, result) {
        res.send(result);
    });
});

app.delete('/api/todo/:id', function (req, res) {
    connection.db.collection('todos').removeOne({
        _id: new ObjectID(req.params.id)
    }, function (err, result) {
        res.send(result);
    });
});

app.listen(connection.port, connection.ip);

console.log('Server running on http://%s:%s', connection.ip, connection.port);
console.log('Database connection: ', connection.db);

module.exports = app;
