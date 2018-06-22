angular.module('usersModule', [])

.controller('usersController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $scope.users = [];
    
    $scope.getUsers = function () {
        $scope.action = 'list';
        $http.get('/users', $rootScope.urlConfig).then(function (response) {
            $scope.users = response.data;
        });
    };

    $scope.newUser = function () {
        $scope.action = 'new';
        $scope.formData = {};
        $scope.formData.ip = $rootScope.currentIp.ip;
        $scope.formData.token = 'Register';
    };

    $scope.createUser = function () {
		if ($scope.formData.login && $scope.formData.email && $scope.formData.password) {
			$scope.action = 'list';
			$http.post('/users', $scope.formData, $rootScope.urlConfig).then(function () {
				$scope.formData = {};
				$scope.getUsers();
				$scope.message = 'Użytkownik został dodany pomyślnie.';
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

    $scope.editUser = function (id) {
        $scope.action = 'edit';
        $http.get('/users/' + id, $rootScope.urlConfig).then(function (response) {
            $scope.formData = response.data;
            $scope.formData.password = '';
            $scope.formData.ip = $rootScope.currentIp.ip;
        });
    };

    $scope.updateUser = function (id) {
		if ($scope.formData.login && $scope.formData.email && $scope.formData.password) {
			$scope.action = 'list';
			$http.put('/users/' + id, $scope.formData, $rootScope.urlConfig).then(function () {
				$scope.formData = {};
				$scope.getUsers();
				$scope.message = 'Użytkownik został zmieniony pomyślnie.';
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

    $scope.deleteUser = function (id, confirmed) {
		if (!confirmed) {
			$scope.id = id;
			$scope.action = 'dialog';
			$scope.status = null;
		}
		else {
			$scope.action = 'list';
			$http.delete('/users/' + id, $rootScope.urlConfig).then(function () {
				$scope.getUsers();
				$scope.message = 'Użytkownik został usunięty pomyślnie.';
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

    $scope.cancelUser = function () {
        $scope.action = 'list';
    };

}]);
