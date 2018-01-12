angular.module('todosModule', [])

.controller('todosController', ['$scope', '$http', function ($scope, $http) {

    $scope.formData = {};
    $scope.pageData = {};
    $scope.action = null;
    $scope.status = null;
    
    $scope.getTodos = function () {
        $scope.action = 'list';
        $http.get('/todos').then(function (response) {
            $scope.todos = response.data;
        });
    };

    $scope.newTodo = function () {
        $scope.action = 'new';
        $scope.formData = {};
        $http.get('http://ipv4.myexternalip.com/json').then(function (response) {
            $scope.formData.ip = response.data.ip;
        });
    };

    $scope.createTodo = function () {
        $scope.action = 'list';
        $http.post('/todos', $scope.formData).then(function () {
            $scope.formData = {};
            $scope.getTodos();
        });
    };

    $scope.editTodo = function (id) {
        $scope.action = 'edit';
        $http.get('/todos/' + id).then(function (response) {
            $scope.formData = response.data;
            $http.get('http://ipv4.myexternalip.com/json').then(function (response) {
                $scope.formData.ip = response.data.ip;
            });
        });
    };

    $scope.updateTodo = function (id) {
        $scope.action = 'list';
        $http.put('/todos/' + id, $scope.formData).then(function () {
            $scope.formData = {};
            $scope.getTodos();
        });
    };

    $scope.deleteTodo = function (id) {
        $scope.action = 'list';
        $http.delete('/todos/' + id).then(function () {
            $scope.getTodos();
        });
    };

    $scope.cancelTodo = function () {
        $scope.action = 'list';
    };

    $scope.getTodos();

}]);