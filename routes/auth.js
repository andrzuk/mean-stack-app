module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    
    const bcrypt = require('bcrypt');

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
