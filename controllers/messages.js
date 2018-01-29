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
        $scope.action = 'list';
        $http.put('/messages/' + id, $scope.formData, $rootScope.urlConfig).then(function () {
            $scope.formData = {};
            $scope.getMessages();
        });
    };

    $scope.deleteMessage = function (id) {
        $scope.action = 'list';
        $http.delete('/messages/' + id, $rootScope.urlConfig).then(function () {
            $scope.getMessages();
        });
    };

    $scope.cancelMessage = function () {
        $scope.action = 'list';
    };

}]);
