var myApp = angular.module('myApp', [])

.controller('mainController', ['$scope', '$http', function ($scope, $http) {

        $scope.formData = {};
        $scope.layout = {
            button: '../templates/button',
            list: '../templates/list',
            form: '../templates/form',
            stats: '../templates/stats',
            manual: '../templates/manual',
            contact: '../templates/contact'
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
            $scope.formData = {};
            $http.get('http://ipv4.myexternalip.com/json').then(function (response) {
                $scope.formData.ip = response.data.ip;
            });
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
                $http.get('http://ipv4.myexternalip.com/json').then(function (response) {
                    $scope.formData.ip = response.data.ip;
                });
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

        $scope.cancelTodo = function () {
            $scope.action = 'list';
        };

        $scope.getManual = function () {
            $scope.action = 'manual';
        };

        $scope.getContact = function () {
            $scope.action = 'contact';
        };

        $scope.getTodos();

	}

]);
