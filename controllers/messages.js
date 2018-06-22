angular.module('messagesModule', [])

.controller('messagesController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $scope.messages = [];
    
    $scope.getMessages = function () {
        $scope.action = 'list';
        $http.get('/messages', $rootScope.urlConfig).then(function (response) {
            $scope.messages = response.data;
        });
    };

    $scope.editMessage = function (id) {
        $scope.action = 'edit';
        $http.get('/messages/' + id, $rootScope.urlConfig).then(function (response) {
            $scope.formData = response.data;
        });
    };

    $scope.updateMessage = function (id) {
		if ($scope.formData.name && $scope.formData.email && $scope.formData.message) {
			$scope.action = 'list';
			$http.put('/messages/' + id, $scope.formData, $rootScope.urlConfig).then(function () {
				$scope.formData = {};
				$scope.getMessages();
				$scope.message = 'Wiadomość została zmieniona pomyślnie.';
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

    $scope.deleteMessage = function (id, confirmed) {
		if (!confirmed) {
			$scope.id = id;
			$scope.action = 'dialog';
			$scope.status = null;
		}
		else {
			$scope.action = 'list';
			$http.delete('/messages/' + id, $rootScope.urlConfig).then(function () {
				$scope.getMessages();
				$scope.message = 'Wiadomość została usunięta pomyślnie.';
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

    $scope.cancelMessage = function () {
        $scope.action = 'list';
    };

}]);
