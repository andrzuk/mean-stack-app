module.exports = function(params) {
    
    var db = params.database;
    var token = {};
    
    token.checkAuth = function(headers, callback) {
        db.collection('users', function (err, collection) {
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
        });
    };

    return token;
};
