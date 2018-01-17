angular.module('todosModule', [])

.controller('todosController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $scope.getTodos = function () {
        $scope.action = 'list';
        $http.get('/todos').then(function (response) {
            $scope.todos = response.data;
        });
    };

    $scope.newTodo = function () {
        $scope.action = 'new';
        $scope.formData = {};
        $scope.formData.ip = $rootScope.currentIp;
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
            $scope.formData.ip = $rootScope.currentIp;
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

}]);
