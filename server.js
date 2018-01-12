var express = require('express');
var mongodb = require('mongodb');
var morgan = require('morgan');
var bodyParser = require('body-parser');

Object.assign = require('object-assign');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

var db = null;
var dbDetails = new Object();
var ObjectID = mongodb.ObjectID;

var connection = require('./config/db.js');

mongodb.connect(connection.url, function (err, conn) {
    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = connection.label;
    dbDetails.type = 'MongoDB';
    var todos = require('./routes/todos.js')({ database: db, objectId: ObjectID });
    app.use('/todos', todos);
    var pages = require('./routes/pages.js')({ database: db, objectId: ObjectID });
    app.use('/pages', pages);
    console.log('Connected to MongoDB at: %s', connection.url);
});

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.get('/templates/:name', function (req, res) {
    res.sendFile(__dirname + '/templates/' + req.params.name + '.html');
});

app.get('/api/subpage/:index', function (req, res) {
    db.collection('pages', function (err, collection) {
        collection.findOne({
            index: req.params.index
        }, function (err, result) {
            res.send(result);
        });
    });
});

app.listen(connection.port, connection.ip);

console.log('Server running on http://%s:%s', connection.ip, connection.port);

module.exports = app;
