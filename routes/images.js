module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    var fs = require('fs');
    var multer = require('multer');
    
    var token = require('./token.js')({ database: db, objectId: ObjectID });
    
    var uploadFolder = process.env.HOME + '/upload/';
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
                res.json({ data: [] });
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
                res.json({ data: [] });
            }
        });
    });

    router.post('/', upload.single('file'), function (req, res, next) {
        token.checkAuth(req.headers, function(access) {
            if (access && req.file) {
                console.log('Received data.....................:', req.file.data);
                fs.rename(req.file.path, req.file.destination + req.file.originalname, function(err) {
                    db.collection('images').insertOne({
                        index: req.body.index,
                        filename: req.file.originalname,
                        filesize: req.file.size,
                        filetype: req.file.mimetype,
                        filedata: req.file.data,
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
                        console.log('Received data.....................:', req.file.data);
                        fs.rename(req.file.path, req.file.destination + req.file.originalname, function(err) {
                            db.collection('images').updateOne({
                                _id: new ObjectID(req.params.id)
                            }, {
                                $set: {
                                    index: req.body.index,
                                    filename: req.file.originalname,
                                    filesize: req.file.size,
                                    filetype: req.file.mimetype,
                                    filedata: req.file.data,
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

    router.get('/file/:name', function (req, res, next) {
        db.collection('images', function (err, collection) {
            collection.findOne({
                index: req.params.name
            }, function (err, result) {
                if (result) {
                    var file = uploadFolder + result.filename;
                    if (fs.existsSync(file)) {
                        res.sendFile(file);
                    }
                    else {
                        res.sendFile(process.env.HOME + '/public/file_not_found.png');
                    }
                }
                else {
                    res.sendFile(process.env.HOME + '/public/file_not_found.png');
                }
            });
        });
    });

    router.get('/index/:index', function (req, res, next) {
        db.collection('images', function (err, collection) {
            collection.findOne({
                index: req.params.index
            }, function (err, result) {
                if (result) {
                    console.log('Send data.....................:', result.filedata);
                    var img = new Buffer(result.filedata, 'base64');
                    res.writeHead(200, {
                        'Content-Type': 'image/png',
                        'Content-Length': img.length
                    });
                    res.end(img);
                }
                else {
                    res.sendFile(process.env.HOME + '/public/file_not_found.png');
                }
            });
        });
    });

    return router;
};
