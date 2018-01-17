angular.module('usersModule', [])

.controller('usersController', ['$scope', '$http', function ($scope, $http) {

    $scope.config = { 
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': window.localStorage.getItem('authToken') 
        } 
    };
    
    $scope.getUsers = function () {
        $scope.action = 'list';
        $http.get('/users', $scope.config).then(function (response) {
            console.log(response);
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
        $http.post('/users', $scope.formData).then(function () {
            $scope.formData = {};
            $scope.getUsers();
        });
    };

    $scope.editUser = function (id) {
        $scope.action = 'edit';
        $http.get('/users/' + id).then(function (response) {
            $scope.formData = response.data;
            $scope.formData.password = '';
            $http.get('http://ipv4.myexternalip.com/json').then(function (response) {
                $scope.formData.ip = response.data.ip;
            });
        });
    };

    $scope.updateUser = function (id) {
        $scope.action = 'list';
        $http.put('/users/' + id, $scope.formData).then(function () {
            $scope.formData = {};
            $scope.getUsers();
        });
    };

    $scope.deleteUser = function (id) {
        $scope.action = 'list';
        $http.delete('/users/' + id).then(function () {
            $scope.getUsers();
        });
    };

    $scope.cancelUser = function () {
        $scope.action = 'list';
    };

}]);
