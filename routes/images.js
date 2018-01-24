module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    
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
            if (access || true) {
                console.log('ACCESS OK');
                console.log('FILE...............:',req.file);
                console.log('FILES..............:',req.files);
                console.log('HEADERS............:',req.headers);
                res.json({ 'headers': req.headers,'files': req.files, 'file': req.file });
                /*
                fs.readFile(req.files.upload.path, function(err, data) {
                    var newPath = __dirname + '/../public/gallery/' + req.files.upload.name;
                    fs.writeFile(newPath, data, function(err) {
                        if (err) throw err;
                        console.log("Upload completed!");
                        db.collection('images').insertOne({
                            index: req.body.index,
                            filename: req.files.upload.name,
                            filesize: req.files.upload.size,
                            date: Date.now()
                        }, function (err, result) {
                            res.send(result);
                        });                
                    });
                });
                */
            }
            else {
                console.log('ACCESS Fail');
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
