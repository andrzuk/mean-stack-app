module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    var fs = require('fs');
    var busboy = require('connect-busboy');
    
    var token = require('./token.js')({ database: db, objectId: ObjectID });
    
    router.use(busboy());

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
                req.pipe(req.busboy);
                req.busboy.on('file', function (fieldname, file, filename) {
                    var fstream = fs.createWriteStream(__dirname + '/../public/img/' + filename);
                    file.pipe(fstream);
                    fstream.on('close', function () {
                        console.log('fstream:',fstream);
                        db.collection('images').insertOne({
                            index: req.body.index,
                            filename: filename,
                            filesize: fstream.size,
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
                req.pipe(req.busboy);
                req.busboy.on('file', function (fieldname, file, filename) {
                    var fstream = fs.createWriteStream(__dirname + '/../public/img/' + filename);
                    file.pipe(fstream);
                    fstream.on('close', function () {
                        db.collection('images').updateOne({
                            _id: new ObjectID(req.params.id)
                        }, {
                            $set: {
                                index: req.body.index,
                                filename: filename,
                                filesize: fstream.size,
                                date: Date.now()
                            }
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

    router.delete('/:id', function (req, res, next) {
        token.checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('images', function (err, collection) {
                    collection.findOne({
                        _id: new ObjectID(req.params.id)
                    }, function (err, result) {
                        fs.unlinkSync(__dirname + '/../public/img/' + result.filename);
                        db.collection('images').removeOne({
                            _id: new ObjectID(req.params.id)
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

    return router;
};
