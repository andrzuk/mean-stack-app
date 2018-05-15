module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    
    var token = require('./token.js')({ database: db, objectId: ObjectID });
    
    var backup = {};

    router.get('/', function (req, res, next) {
        token.checkAuth(req.headers, function(access) {
            if (access) {
                db.collection('pages', function (err, collection) {
                    collection.find().toArray(function (err, result) {
                        backup.pages = result;
                        db.collection('settings', function (err, collection) {
                            collection.find().toArray(function (err, result) {
                                backup.settings = result;
                                res.send(backup);
                            });
                        });
                    });
                });
            }
            else {
                res.json({ data: [] });
            }
        });
    });

    router.post('/', function (req, res, next) {
        token.checkAuth(req.headers, function(access) {
            if (access) {
                console.log('Table..........................:', req.body.table);
                console.log('Script.........................:', req.body.script);
                /*
                db.collection(req.body.table).insert(req.body.script, function (err, result) {
                    res.send(result);
                });
                */
                $.each($.parseJSON(req.body.script), function(index, record) {
                    delete record._id;
                    console.log('Record.........................:', record);
                });
                console.log('Stripped.......................:', req.body.script);
            }
            else {
                res.json({});
            }
        });
    });

    return router;
};
