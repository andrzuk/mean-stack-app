var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    db.collection('todos', function (err, collection) {
        collection.find().toArray(function (err, result) {
            res.send(result);
        });
    });
});

router.get('/:id', function (req, res, next) {
    db.collection('todos', function (err, collection) {
        collection.findOne({
            _id: new ObjectID(req.params.id)
        }, function (err, result) {
            res.send(result);
        });
    });
});

router.post('/', function (req, res, next) {
    db.collection('todos').insertOne({
        text: req.body.text,
        ip: req.body.ip,
        date: Date.now()
    }, function (err, result) {
        res.send(result);
    });
});

router.put('/:id', function (req, res, next) {
    db.collection('todos').updateOne({
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

router.delete('/:id', function (req, res, next) {
    db.collection('todos').removeOne({
        _id: new ObjectID(req.params.id)
    }, function (err, result) {
        res.send(result);
    });
});

module.exports = router;
