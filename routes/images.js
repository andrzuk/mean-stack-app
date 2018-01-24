module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    var fs = require('fs');
    var multer = require('multer');
    
    var token = require('./token.js')({ database: db, objectId: ObjectID });
    
    var uploadFolder = process.env.OPENSHIFT_DATA_DIR;
    var upload = multer({ dest: uploadFolder });
    
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

    router.post('/', upload.single('file'), function (req, res, next) {
        token.checkAuth(req.headers, function(access) {
            if (access && req.file) {
                fs.rename(req.file.path, req.file.destination + req.file.originalname, function(err) {
                    db.collection('images').insertOne({
                        index: req.body.index,
                        filename: req.file.originalname,
                        filesize: req.file.size,
                        filetype: req.file.mimetype,
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
    });

    router.put('/:id', upload.single('file'), function (req, res, next) {
        token.checkAuth(req.headers, function(access) {
            if (access && req.file) {
                db.collection('images', function (err, collection) {
                    collection.findOne({
                        _id: new ObjectID(req.params.id)
                    }, function (err, result) {
                        var name = uploadFolder + result.filename;
                        if (fs.existsSync(name)) {
                            fs.unlinkSync(name);
                        }
                        fs.rename(req.file.path, req.file.destination + req.file.originalname, function(err) {
                            db.collection('images').updateOne({
                                _id: new ObjectID(req.params.id)
                            }, {
                                $set: {
                                    index: req.body.index,
                                    filename: req.file.originalname,
                                    filesize: req.file.size,
                                    filetype: req.file.mimetype,
                                    date: Date.now()
                                }
                            }, function (err, result) {
                                res.send(result);
                            });
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
                        var name = uploadFolder + result.filename;
                        if (fs.existsSync(name)) {
                            fs.unlinkSync(name);
                        }
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

    router.get('/index/:id', function (req, res, next) {
        db.collection('images', function (err, collection) {
            collection.findOne({
                index: req.params.id
            }, function (err, result) {
                var file = process.env.OPENSHIFT_DATA_DIR + result.filename;
                if (fs.existsSync(file)) {
                    res.sendFile(file);
                }
                else {
                    console.log('FILE NOT FOUND: ', file);
                    res.sendFile(__dirname + '/../public/file_not_found.png')
                }
            });
        });
    });

    return router;
};
