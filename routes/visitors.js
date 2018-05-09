module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    
    var token = require('./token.js')({ database: db, objectId: ObjectID });

    router.get('/:excluded/:limit', function (req, res, next) {
        console.log('Received request [1]:', req.params.excluded.split(','));
        console.log('Received request [2]:', req.params.limit);
        token.checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('visitors', function (err, collection) {
                    collection.find({ ip: { $nin: req.params.excluded.split(',') } }).sort({ date: -1 }).toArray(function (err, result) {
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
        console.log('Received request:', req.params.id);
        token.checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('visitors', function (err, collection) {
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

    router.delete('/:id', function (req, res, next) {
        token.checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('visitors').removeOne({
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
