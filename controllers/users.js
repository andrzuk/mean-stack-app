angular.module('usersModule', [])

.controller('usersController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $scope.getUsers = function () {
        $scope.action = 'list';
        $rootScope.urlConfig.headers["x-access-token"] = window.localStorage.getItem('authToken');
        $http.get('/users', $rootScope.urlConfig).then(function (response) {
            $scope.users = response.data;
        });
    };

    $scope.newUser = function () {
        $scope.action = 'new';
        $scope.formData = {};
        $http.get('http://ipv4.myexternalip.com/json').then(function (response) {
            $scope.formData.ip = response.data.ip;
        });
        $scope.formData.token = 'Register';
    };

    $scope.createUser = function () {
        $scope.action = 'list';
        $http.post('/users', $scope.formData, $rootScope.urlConfig).then(function () {
            $scope.formData = {};
            $scope.getUsers();
        });
    };

    $scope.editUser = function (id) {
        $scope.action = 'edit';
        $rootScope.urlConfig.headers["x-access-token"] = window.localStorage.getItem('authToken');
        $http.get('/users/' + id, $rootScope.urlConfig).then(function (response) {
            $scope.formData = response.data;
            $scope.formData.password = '';
            $http.get('http://ipv4.myexternalip.com/json').then(function (response) {
                $scope.formData.ip = response.data.ip;
            });
        });
    };

    $scope.updateUser = function (id) {
        $scope.action = 'list';
        $rootScope.urlConfig.headers["x-access-token"] = window.localStorage.getItem('authToken');
        $http.put('/users/' + id, $scope.formData, $rootScope.urlConfig).then(function () {
            $scope.formData = {};
            $scope.getUsers();
        });
    };

    $scope.deleteUser = function (id) {
        $scope.action = 'list';
        $rootScope.urlConfig.headers["x-access-token"] = window.localStorage.getItem('authToken');
        $http.delete('/users/' + id, $rootScope.urlConfig).then(function () {
            $scope.getUsers();
        });
    };

    $scope.cancelUser = function () {
        $scope.action = 'list';
    };

}]);
