var express = require('express');
var mongodb = require('mongodb');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');

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
var dbParams = null;

var connection = require('./config/db.js');

mongodb.connect(connection.url, function (err, conn) {
    db = conn;
    dbDetails.databaseName = conn.databaseName;
    dbDetails.url = connection.label;
    dbDetails.type = 'MongoDB';
    dbParams = { 
        database: conn, 
        objectId: ObjectID, 
    };
    var auth = require('./routes/auth.js')(dbParams);
    app.use('/auth', auth);
    var pages = require('./routes/pages.js')(dbParams);
    app.use('/pages', pages);
    var users = require('./routes/users.js')(dbParams);
    app.use('/users', users);
    var messages = require('./routes/messages.js')(dbParams);
    app.use('/messages', messages);
    var images = require('./routes/images.js')(dbParams);
    app.use('/images', images);
    var settings = require('./routes/settings.js')(dbParams);
    app.use('/settings', settings);
    var visitors = require('./routes/visitors.js')(dbParams);
    app.use('/visitors', visitors);
    var todos = require('./routes/todos.js')(dbParams);
    app.use('/todos', todos);
    console.log('Connected to MongoDB at: %s', connection.url);
});

var dns = require('dns');

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
    var file = process.env.HOME + '/upload/' + req.params.name;
    if (fs.existsSync(file)) {
        res.sendFile(file);
    }
    else {
        res.sendFile(process.env.HOME + '/public/file_not_found.png')
    }
});

app.get('/setting/:name', function (req, res) {
    db.collection('settings', function (err, collection) {
        collection.findOne({
            name: req.params.name
        }, function (err, result) {
            res.send(result);
        });
    });
});

app.post('/visitor', function (req, res) {
    if (req.body.ip !== null && req.body.url.length) {
        dns.lookupService(req.body.ip, 22, function(err, hostname, service) {
            db.collection('visitors').insertOne({
                ip: req.body.ip,
                host: hostname,
                referer: req.body.referer,
                url: req.body.url,
                date: Date.now()
            }, function (err, result) {});
        });
    }
    res.json({});
});

app.listen(connection.port, connection.ip);

console.log('Server running on http://%s:%s', connection.ip, connection.port);

module.exports = app;
