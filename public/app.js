var myApp = angular.module('myApp', [])

	.controller('mainController', ['$scope', '$http', function ($scope, $http) {

		$scope.formData = {};
		$scope.layout = {
			button: '../templates/button',
			list: '../templates/list',
			form: '../templates/form',
			stats: '../templates/stats',
		};
		$scope.action = null;

		$scope.getTodos = function () {
			$scope.action = 'list';
			$http.get('/api/todos').then(function (response) {
					$scope.todos = response.data;
				});
		};

		$scope.newTodo = function (id) {
			$scope.action = 'new';
		};

		$scope.createTodo = function () {
			$scope.action = 'list';
			$http.post('/api/todo', $scope.formData).then(function () {
					$scope.formData = {};
					$scope.getTodos();
				});
		};

		$scope.editTodo = function (id) {
			$scope.action = 'edit';
			$http.get('/api/todo/' + id).then(function (response) {
					$scope.formData = response.data;
				});
		};

		$scope.updateTodo = function (id) {
			$scope.action = 'list';
			$http.put('/api/todo/' + id, $scope.formData).then(function () {
					$scope.formData = {};
					$scope.getTodos();
				});
		};

		$scope.deleteTodo = function (id) {
			$scope.action = 'list';
			$http.delete('/api/todo/' + id).then(function () {
					$scope.getTodos();
				});
		};

		$scope.getTodos();

	}

]);
