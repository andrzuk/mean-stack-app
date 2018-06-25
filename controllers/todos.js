angular.module('todosModule', [])

.controller('todosController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

	$scope.todos = [];
	
	$scope.getTodos = function () {
		$scope.action = 'list';
		$http.get('/todos').then(function (response) {
			$scope.todos = response.data;
		});
	};

	$scope.newTodo = function () {
		$scope.action = 'new';
		$scope.formData = {};
		$scope.formData.ip = $rootScope.currentIp.ip;
	};

	$scope.createTodo = function () {
		if ($scope.formData.text) {
			$scope.action = 'list';
			$http.post('/todos', $scope.formData).then(function () {
				$scope.formData = {};
				$scope.getTodos();
				$scope.message = 'Zadanie zostało dodane pomyślnie.';
				$scope.status = 'info';
				$('div.alert').fadeIn();
				setTimeout(function() {
					$scope.message = null;
					$scope.status = null;
					$('div.alert').fadeOut();
				}, $rootScope.settings['messages_timeout']);
			});
		}
	};

	$scope.editTodo = function (id) {
		$scope.action = 'edit';
		$http.get('/todos/' + id).then(function (response) {
			$scope.formData = response.data;
			$scope.formData.ip = $rootScope.currentIp.ip;
		});
	};

	$scope.updateTodo = function (id) {
		if ($scope.formData.text) {
			$scope.action = 'list';
			$http.put('/todos/' + id, $scope.formData).then(function () {
				$scope.formData = {};
				$scope.getTodos();
				$scope.message = 'Zadanie zostało zmienione pomyślnie.';
				$scope.status = 'info';
				$('div.alert').fadeIn();
				setTimeout(function() {
					$scope.message = null;
					$scope.status = null;
					$('div.alert').fadeOut();
				}, $rootScope.settings['messages_timeout']);
			});
		}
	};

	$scope.deleteTodo = function (id, confirmed) {
		if (!confirmed) {
			$scope.id = id;
			$scope.action = 'dialog';
			$scope.status = null;
		}
		else {
			$scope.action = 'list';
			$http.delete('/todos/' + id).then(function () {
				$scope.getTodos();
				$scope.message = 'Zadanie zostało usunięte pomyślnie.';
				$scope.status = 'info';
				$('div.alert').fadeIn();
				setTimeout(function() {
					$scope.message = null;
					$scope.status = null;
					$('div.alert').fadeOut();
				}, $rootScope.settings['messages_timeout']);
			});
		}
	};

	$scope.setTodo = function (id, value) {
		$scope.action = 'list';
		$http.put('/todos/' + id + '/' + value).then(function () {
			$scope.getTodos();
			$scope.message = 'Status został zmieniony pomyślnie.';
			$scope.status = 'info';
			$('div.alert').fadeIn();
			setTimeout(function() {
				$scope.message = null;
				$scope.status = null;
				$('div.alert').fadeOut();
			}, $rootScope.settings['messages_timeout']);
		});
	};

	$scope.cancelTodo = function () {
		$scope.action = 'list';
	};

}]);
