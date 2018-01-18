module.exports = function(params) {
    
    var db = params.database;
    var token = {};
    
    token.checkAuth = function(headers, callback) {
        console.log("Headers:", headers);
        db.collection('users', function (err, collection) {
            console.log(err, collection);
            if (collection != undefined) {
                collection.findOne({
                    _id: new ObjectID(headers['user-id'])
                }, function (err, result) {
                    if (result) {
                        callback(result.token == headers['x-access-token']);
                    }
                    else {
                        callback(false);
                    }
                });
            }
            else {
                callback(false);
            }
        });
    };

    return token;
};
