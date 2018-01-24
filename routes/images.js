module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    var fileupload = require('express-fileupload');
    
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
                if (!req.files) {
                    res.send("File was not found");
                    return;
                }
                db.collection('images').insertOne({
                    index: req.body.index,
                    filename: req.files.uploaded.name,
                    filesize: req.files.uploaded.size,
                    date: Date.now()
                }, function (err, result) {
                    res.send(result);
                });
                
                
                
                console.log('ACCESS OK');
                console.log('FILE...............:',req.file);
                console.log('FILES..............:',req.files);
                console.log('HEADERS............:',req.headers);
                /*
                fs.readFile(req.files.uploaded.path, function(err, data) {
                    var newPath = __dirname + '/../public/gallery/' + req.files.uploaded.name;
                    fs.writeFile(newPath, data, function(err) {
                        if (err) throw err;
                        console.log("Upload completed!");
                        db.collection('images').insertOne({
                            index: req.body.index,
                            filename: req.files.uploaded.name,
                            filesize: req.files.uploaded.size,
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
