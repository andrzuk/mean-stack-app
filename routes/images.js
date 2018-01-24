module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    var fs = require('fs');
    var multer = require('multer');
    var busboy = require('connect-busboy');
    
    var token = require('./token.js')({ database: db, objectId: ObjectID });
    
    var uploadFolder = __dirname + '/../public/img/';
    var upload = multer({ dest: uploadFolder });
    
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

    router.post('/', upload.single('file'), function (req, res, next) {
        token.checkAuth(req.headers, function(access) {
            if (access) {
                console.log('FILE......................:', req.file);
                console.log('BODY......................: ',req.body);
                
                fs.writeFile(uploadFolder + req.file.filename, req.file, function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    db.collection('images').insertOne({
                        index: req.body.index,
                        filename: req.file.filename,
                        filesize: req.file.size,
                        date: Date.now()
                    }, function (err, result) {
                        res.send(result);
                    });
                    
                    console.log("The file was saved!");
                    res.send('OK');
                    return;
                }); 
                
                
                req.pipe(req.busboy);
                req.busboy.on('index', function (fieldname, file, filename) {
                    console.log('fieldname:',fieldname);
                    console.log('file:',file);
                    console.log('filename:',filename);
                });
                req.busboy.on('file', function (fieldname, file, filename) {
                    var fstream = fs.createWriteStream(uploadFolder + filename);
                    file.pipe(fstream);
                    fstream.on('close', function () {
                        db.collection('images').insertOne({
                            index: req.body.index,
                            filename: filename,
                            filesize: fstream.bytesWritten,
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
                db.collection('images', function (err, collection) {
                    collection.findOne({
                        _id: new ObjectID(req.params.id)
                    }, function (err, result) {
                        fs.unlinkSync(uploadFolder + result.filename);
                        db.collection('images').removeOne({
                            _id: new ObjectID(req.params.id)
                        }, function (err, result) {
                            req.pipe(req.busboy);
                            req.busboy.on('file', function (fieldname, file, filename) {
                                var fstream = fs.createWriteStream(uploadFolder + filename);
                                file.pipe(fstream);
                                fstream.on('close', function () {
                                    db.collection('images').updateOne({
                                        _id: new ObjectID(req.params.id)
                                    }, {
                                        $set: {
                                            index: req.body.index,
                                            filename: filename,
                                            filesize: fstream.bytesWritten,
                                            date: Date.now()
                                        }
                                    }, function (err, result) {
                                        res.send(result);
                                    });
                                });
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
                        fs.unlinkSync(uploadFolder + result.filename);
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
