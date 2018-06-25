angular.module('loginsModule', [])

.controller('loginsController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

	$scope.logins = [];
	
	$scope.getLogins = function () {
		$scope.action = 'list';
		$http.get('/setting/visitors_excluded').then(function (response) {
			$scope.excludes = response.data;
			$http.get('/setting/visitors_limit').then(function (response) {
				$scope.limit = response.data;
				$http.get('/logins/' + $scope.excludes.value + '/' + $scope.limit.value, $rootScope.urlConfig).then(function (response) {
					$scope.logins = response.data;
				});
			});
		});
	};

	$scope.viewLogin = function (id) {
		$scope.action = 'view';
		$http.get('/logins/' + id, $rootScope.urlConfig).then(function (response) {
			$scope.login = response.data;
		});
	};

	$scope.deleteLogin = function (id, confirmed) {
		if (!confirmed) {
			$scope.id = id;
			$scope.action = 'dialog';
			$scope.status = null;
		}
		else {
			$scope.action = 'list';
			$http.delete('/logins/' + id, $rootScope.urlConfig).then(function () {
				$scope.getLogins();
				$scope.message = 'Logowanie zostało usunięte pomyślnie.';
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

	$scope.excludeLogin = function (ip) {
		$scope.action = 'list';
		$http.get('/setting/visitors_excluded').then(function (response) {
			$scope.excludes = response.data;
			var details = { id: $scope.excludes._id, value: $scope.excludes.value };
			$http.put('/visitors/exclude/' + ip, details, $rootScope.urlConfig).then(function () {
				$scope.getLogins();
				$scope.message = 'Adres został wykluczony pomyślnie.';
				$scope.status = 'info';
				$('div.alert').fadeIn();
				setTimeout(function() {
					$scope.message = null;
					$scope.status = null;
					$('div.alert').fadeOut();
				}, $rootScope.settings['messages_timeout']);
			});
		});
	};

	$scope.cancelLogin = function () {
		$scope.action = 'list';
	};

}]);
