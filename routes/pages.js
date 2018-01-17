module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();

    var checkAuth = function(headers, callback) {
        db.collection('users', function (err, collection) {
            collection.findOne({
                _id: new ObjectID(headers['user-id'])
            }, function (err, result) {
                if (result) {
                    callback(result.token == headers['x-access-token']);
                }
                else {
                    callback(false);
                }
            });
        });
    };

    router.get('/', function (req, res, next) {
        checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('pages', function (err, collection) {
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
        checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('pages', function (err, collection) {
                    collection.findOne({
                        _id: new ObjectID(req.params.id)
                    }, function (err, result) {
                        res.send(result);
                    });
                });
            }
            else {
                res.json({ data: {} });
            }
        });
    });

    router.post('/', function (req, res, next) {
        checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('pages').insertOne({
                    index: req.body.index,
                    title: req.body.title,
                    description: req.body.description,
                    ip: req.body.ip,
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
        checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('pages').updateOne({
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
            }
            else {
                res.json({});
            }
        });
    });

    router.delete('/:id', function (req, res, next) {
        checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('pages').removeOne({
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
