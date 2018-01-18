module.exports = function(params) {
    
    var db = params.database;
    var ObjectID = params.objectId;
    var token = {};
    
    token.checkAuth = function(headers, callback) {
        console.log("Headers:", headers);
        db.collection('users', function (err, collection) {
            console.log("Collection:", err, collection);
            if (collection != undefined) {
                collection.findOne({
                    _id: new ObjectID(headers['user-id'])
                }, function (err, result) {
                    console.log("FindOne:", err, result);
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
