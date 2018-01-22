module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    var multipart = require('connect-multiparty');
    var multipartMiddleware = multipart();
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

    router.post('/', multipartMiddleware, function (req, res, next) {
        /*
        token.checkAuth(req.headers, function(access) {
            if (access) {
                console.log('REQ:',req);
                console.log('FILES:',req.files);
                var tempPath = req.files.file.path;
                var targetPath = path.resolve('../upload/' + req.files.file.name);
                console.log('temp path:',tempPath);
                console.log('target path:',targetPath);
                fs.rename(tempPath, targetPath, function(err) {
                    if (err) throw err;
                    console.log("Upload completed!");
                    db.collection('images').insertOne({
                        index: req.body.index,
                        filename: req.files.file.name,
                        filesize: req.files.file.path,
                        resolution: req.files.file.size,
                        date: Date.now()
                    }, function (err, result) {
                        res.send(result);
                    });                
                });
            }
            else {
                res.json({});
            }
        });
        */
        fs.readFile(req.files.upload.path, function(err, data) {

            var newPath = __dirname + '/../public/gallery/' + req.files.upload.name;
            console.log('new Path:', newPath);
            fs.writeFile(newPath, data, function(err) {
              if (err) console.log({
                err: err
              });
              else {
                res.json({ 'name': req.files.upload.name });
              }
            });
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
