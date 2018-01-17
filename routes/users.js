module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    
    const bcrypt = require('bcrypt');
    
    var checkAuth = function(headers, callback) {
        console.log('Sprawdzamy headers:', headers);
        db.collection('users', function (err, collection) {
            collection.findOne({
                _id: new ObjectID(headers['user-id'])
            }, function (err, result) {
                console.log('Sprawdzamy result:', result);
                callback(result.token == headers['x-access-token']);
            });
        });
    };

    router.get('/', function (req, res, next) {
        checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('users', function (err, collection) {
                    collection.find().toArray(function (err, result) {
                        res.send(result);
                    });
                });
            }
            else {
                res.json({ data: {} });
            }
        });
    });

    router.get('/:id', function (req, res, next) {
        db.collection('users', function (err, collection) {
            collection.findOne({
                _id: new ObjectID(req.params.id)
            }, function (err, result) {
                res.send(result);
            });
        });
    });

    router.post('/', function (req, res, next) {
        db.collection('users').insertOne({
            login: req.body.login,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            ip: req.body.ip,
            date: Date.now(),
            token: req.body.token
        }, function (err, result) {
            res.send(result);
        });
    });

    router.put('/:id', function (req, res, next) {
        db.collection('users').updateOne({
            _id: new ObjectID(req.params.id)
        }, {
            $set: {
                login: req.body.login,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                ip: req.body.ip,
                date: Date.now(),
                token: req.body.token
            }
        }, function (err, result) {
            res.send(result);
        });
    });

    router.delete('/:id', function (req, res, next) {
        db.collection('users').removeOne({
            _id: new ObjectID(req.params.id)
        }, function (err, result) {
            res.send(result);
        });
    });

    return router;
};
