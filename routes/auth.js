module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    
    const bcrypt = require('bcrypt');

    router.get('/:id', function (req, res, next) {
        db.collection('users', function (err, collection) {
            if (collection != undefined) {
                collection.findOne({
                    _id: new ObjectID(req.params.id)
                }, function (err, result) {
                    var user = { 
                        id: result._id, 
                        login: result.login,
                        email: result.email,
                        token: result.token
                    };
                    res.send(user);
                });
            }
            else {
                res.json({});
            }
        });
    });

    router.post('/login', function (req, res, next) {
        var user = {};
        db.collection('users', function (err, collection) {
            collection.findOne({
                login: req.body.login,
            }, function (err, result) {
                if (result && req.body.password) {
                    if (bcrypt.compareSync(req.body.password, result.password)) {
                        user = result;
                        user.isLogged = true;
                        user.token = bcrypt.hashSync(result.password, 10);
                        user.password = null;
                        db.collection('users').updateOne({
                            _id: new ObjectID(result._id)
                        }, {
                            $set: {
                                token: user.token
                            }
                        }, function () {});
                    }
                }
                res.send(user);
            });
        });
    });

    router.post('/logout', function (req, res, next) {
        db.collection('users').updateOne({
            _id: new ObjectID(req.body._id)
        }, {
            $set: {
                token: 'Logout'
            }
        }, function (err, result) {
            res.send(result);
        });
    });

    return router;
};
