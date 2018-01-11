var myApp = angular.module('myApp', [])

.controller('mainController', ['$scope', '$http', function ($scope, $http) {

    $scope.formData = {};
    $scope.pageData = {};
    $scope.layout = {
        home: '../templates/home',
        plist: '../templates/plist',
        pform: '../templates/pform',
        list: '../templates/list',
        form: '../templates/form',
        manual: '../templates/manual',
        contact: '../templates/contact'
    };
    $scope.action = null;
    $scope.status = null;
    
    $scope.getHome = function() {
        $scope.action = 'home';
        $scope.status = 'loading';
        $http.get('/api/subpage/index').then(function(response) {
            $scope.pageData = response.data;
            $scope.status = 'ready';
        });
    };
    
    $scope.getSubpage = function(index) {
        $http.get('/api/subpage/' + index).then(function(response) {
            return response.data;
        });
    };

    $scope.getPage = function(id) {
        $http.get('/api/page/' + id).then(function(response) {
            return response.data;
        });
    };

    $scope.getPages = function () {
        $scope.action = 'plist';
        $http.get('/api/pages').then(function (response) {
            $scope.pages = response.data;
        });
    };

    $scope.newPage = function () {
        $scope.action = 'pnew';
        $scope.formData = {};
        $http.get('http://ipv4.myexternalip.com/json').then(function (response) {
            $scope.formData.ip = response.data.ip;
        });
    };

    $scope.createPage = function () {
        $scope.action = 'plist';
        $http.post('/api/page', $scope.formData).then(function () {
            $scope.formData = {};
            $scope.getPages();
        });
    };

    $scope.editPage = function (id) {
        $scope.action = 'pedit';
        $http.get('/api/page/' + id).then(function (response) {
            $scope.formData = response.data;
            $http.get('http://ipv4.myexternalip.com/json').then(function (response) {
                $scope.formData.ip = response.data.ip;
            });
        });
    };

    $scope.updatePage = function (id) {
        $scope.action = 'plist';
        $http.put('/api/page/' + id, $scope.formData).then(function () {
            $scope.formData = {};
            $scope.getPages();
        });
    };

    $scope.deletePage = function (id) {
        $scope.action = 'plist';
        $http.delete('/api/page/' + id).then(function () {
            $scope.getPages();
        });
    };

    $scope.cancelPage = function () {
        $scope.action = 'plist';
    };

    $scope.getTodos = function () {
        $scope.action = 'list';
        $http.get('/api/todos').then(function (response) {
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

    $scope.getHome();

}]);
