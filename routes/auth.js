module.exports = function(params) {
    
    var db = params.database;
    var express = require('express');
    var router = express.Router();
    
    const bcrypt = require('bcrypt');

    router.post('/login', function (req, res, next) {
        console.log('Form body:', req.body);
        db.collection('users', function (err, collection) {
            collection.findOne({
                login: req.body.login,
            }, function (err, result) {
                console.log('step-1');
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
