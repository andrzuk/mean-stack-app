module.exports = function(params) {
    
    var db = params.database;
    var express = require('express');
    var router = express.Router();

    router.get('/', function (req, res, next) {
        db.collection('pages', function (err, collection) {
            collection.find().toArray(function (err, result) {
                res.send(result);
            });
        });
    });

    router.get('/:id', function (req, res, next) {
        db.collection('pages', function (err, collection) {
            collection.findOne({
                _id: new ObjectID(req.params.id)
            }, function (err, result) {
                res.send(result);
            });
        });
    });

    router.post('/', function (req, res, next) {
        db.collection('pages').insertOne({
            index: req.body.index,
            title: req.body.title,
            description: req.body.description,
            ip: req.body.ip,
            date: Date.now()
        }, function (err, result) {
            res.send(result);
        });
    });

    router.put('/:id', function (req, res, next) {
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
    });

    router.delete('/:id', function (req, res, next) {
        db.collection('pages').removeOne({
            _id: new ObjectID(req.params.id)
        }, function (err, result) {
            res.send(result);
        });
    });

    return router;
};
