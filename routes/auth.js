module.exports = function(params) {
    
    var db = params.database;
    var express = require('express');
    var router = express.Router();
    
    const bcrypt = require('bcrypt');

    router.post('/login', function (req, res, next) {
        db.collection('users', function (err, collection) {
            collection.findOne({
                login: req.body.login,
            }, function (err, result) {
                console.log('RESULT:', result);
                var user = {};
                if (result) {
                    user = result.data;
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
