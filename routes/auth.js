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
                if (result) {
                    user = result;
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        user.isLogged = true;
                    }
                    else {
                        user.isLogged = false;
                    }
                }
                res.send(user);
            });
        });
    });

    return router;
};
