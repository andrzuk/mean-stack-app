module.exports = function(params) {
	
	var db = params.database;
	var ObjectID = params.objectId;
	var express = require('express');
	var router = express.Router();
	
	var token = require('./token.js')({ database: db, objectId: ObjectID });

	router.get('/:excluded/:limit', function (req, res, next) {
		token.checkAuth(req.headers, function(access) {
			if (access) {
				db.collection('visitors', function (err, collection) {
					collection.find({ ip: { $nin: req.params.excluded.split(', ') } })
							  .sort({ date: -1 })
							  .limit(parseInt(req.params.limit))
							  .toArray(function (err, result) {
						res.send(result);
					});
				});
			}
			else {
				res.json({ data: [] });
			}
		});
	});

	router.get('/:id', function (req, res, next) {
		token.checkAuth(req.headers, function(access) {
			if (access) {
				db.collection('visitors', function (err, collection) {
					collection.findOne({
						_id: new ObjectID(req.params.id)
					}, function (err, result) {
						res.send(result);
					});
				});
			}
			else {
				res.json({ data: [] });
			}
		});
	});

	router.put('/exclude/:ip', function (req, res, next) {
		token.checkAuth(req.headers, function(access) {
			if (access) {
				db.collection('settings').updateOne({
					_id: new ObjectID(req.body.id)
				}, {
					$set: {
						value: req.body.value + ', ' + req.params.ip,
						date: Date.now()
					}
				}, function (err, result) {
					res.send(result);
				});
			}
			else {
				res.json({});
			}
		});
	});

	router.delete('/:id', function (req, res, next) {
		token.checkAuth(req.headers, function(access) {
			if (access) {
				db.collection('visitors').removeOne({
					_id: new ObjectID(req.params.id)
				}, function (err, result) {
					res.send(result);
				});
			}
			else {
				res.json({});
			}
		});
	});

	return router;
};
