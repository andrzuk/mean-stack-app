module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var express = require('express');
    var router = express.Router();
    
    const bcrypt = require('bcrypt');

    router.post('/login', function (req, res, next) {
        db.collection('users', function (err, collection) {
            collection.findOne({
                login: new ObjectID(req.body.login),
            }, function (err, result) {
                if (bcrypt.compareSync(req.body.password, result.data.password)) {
                    result.data.isLogged = true;
                }
                else {
                    result.data.isLogged = false;
                }
                res.send(result);
            });
        });
    });

    return router;
};
