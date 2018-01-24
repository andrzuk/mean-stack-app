var express = require('express');
var mongodb = require('mongodb');
var morgan = require('morgan');
var bodyParser = require('body-parser');

Object.assign = require('object-assign');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));

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
    var auth = require('./routes/auth.js')({ database: db, objectId: ObjectID });
    app.use('/auth', auth);
    var pages = require('./routes/pages.js')({ database: db, objectId: ObjectID });
    app.use('/pages', pages);
    var users = require('./routes/users.js')({ database: db, objectId: ObjectID });
    app.use('/users', users);
    var messages = require('./routes/messages.js')({ database: db, objectId: ObjectID });
    app.use('/messages', messages);
    var images = require('./routes/images.js')({ database: db, objectId: ObjectID });
    app.use('/images', images);
    var todos = require('./routes/todos.js')({ database: db, objectId: ObjectID });
    app.use('/todos', todos);
    console.log('Connected to MongoDB at: %s', connection.url);
});

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.get('/templates/:name', function (req, res) {
    res.sendFile(__dirname + '/templates/' + req.params.name + '.html');
});

app.get('/page/:index', function (req, res) {
    db.collection('pages', function (err, collection) {
        collection.findOne({
            index: req.params.index
        }, function (err, result) {
            res.send(result);
        });
    });
});

app.get('/img/:name', function (req, res) {
    res.sendFile(__dirname + '/public/img/' + req.params.name);
});

app.listen(connection.port, connection.ip);

console.log('Server running on http://%s:%s', connection.ip, connection.port);

module.exports = app;
