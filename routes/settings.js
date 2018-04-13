module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    
    var token = require('./token.js')({ database: db, objectId: ObjectID });

    router.get('/', function (req, res, next) {
        token.checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('settings', function (err, collection) {
                    collection.find().toArray(function (err, result) {
                        res.send(result);
                    });
                });
            }
            else {
                res.json({ data: [] });
            }
        });
    });

    router.get('/:id', function (req, res, next) {
        token.checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('settings', function (err, collection) {
                    collection.findOne({
                        _id: new ObjectID(req.params.id)
                    }, function (err, result) {
                        res.send(result);
                    });
                });
            }
            else {
                res.json({ data: [] });
            }
        });
    });

    router.post('/', function (req, res, next) {
        token.checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('settings').insertOne({
                    name: req.body.name,
                    value: req.body.value,
                    description: req.body.description,
                    date: Date.now()
                }, function (err, result) {
                    res.send(result);
                });
            }
            else {
                res.json({});
            }
        });
    });

    router.put('/:id', function (req, res, next) {
        token.checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('settings').updateOne({
                    _id: new ObjectID(req.params.id)
                }, {
                    $set: {
                        name: req.body.name,
                        value: req.body.value,
                        description: req.body.description,
                        date: Date.now()
                    }
                }, function (err, result) {
                    res.send(result);
                });
            }
            else {
                res.json({});
            }
        });
    });

    router.delete('/:id', function (req, res, next) {
        token.checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('settings').removeOne({
                    _id: new ObjectID(req.params.id)
                }, function (err, result) {
                    res.send(result);
                });
            }
            else {
                res.json({});
            }
        });
    });

    return router;
};
