module.exports = function(params) {
    
    var db = params.database;
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
                    }
                }
                res.send(user);
            });
        });
    });

    return router;
};