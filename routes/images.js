module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    var formidable = require('formidable');
    var fs = require('fs');
    
    var token = require('./token.js')({ database: db, objectId: ObjectID });

    router.get('/', function (req, res, next) {
        token.checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('images', function (err, collection) {
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
        token.checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('images', function (err, collection) {
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
        token.checkAuth(req.headers, function(access) {
            if (access) {
                var form = new formidable.IncomingForm();
                form.parse(req, function (err, fields, files) {
                    console.log('fields:', fields);
                    console.log('files:', files);
                    var oldpath = files.filetoupload.path;
                    var newpath = '../upload/' + files.filetoupload.name;
                    fs.rename(oldpath, newpath, function (err) {
                        if (err) throw err;
                        db.collection('images').insertOne({
                            index: req.body.index,
                            filename: files.filetoupload.name,
                            filesize: files.filetoupload.size,
                            resolution: 0,
                            date: Date.now()
                        }, function (err, result) {
                            res.send(result);
                        });
                    });
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
                db.collection('images').updateOne({
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
        token.checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('images').removeOne({
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
