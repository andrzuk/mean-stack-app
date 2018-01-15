angular.module('mainApp', ['pagesModule', 'todosModule', 'ngSanitize'])

.controller('mainController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

    $scope.layout = {
        home: '../templates/home',
        manual: '../templates/manual',
        contact: '../templates/contact',
        pages: '../templates/pages',
        users: '../templates/users'
        todos: '../templates/todos',
    };
    
    $scope.formData = {};
    $scope.pageData = {};
    $scope.module = null;
    $scope.action = null;
    $scope.status = null;    
    
    $scope.getHome = function() {
        $scope.module = 'index';
        $scope.action = 'home';
        $scope.getSubpage('index');
    };
    
    $scope.getContact = function () {
        $scope.module = 'contact';
        $scope.action = 'contact';
        $scope.getSubpage('contact');
    };

    $scope.getManual = function () {
        $scope.module = 'manual';
        $scope.action = 'manual';
    };

    $scope.getSubpage = function (index) {
        $scope.status = 'loading';
        $http.get('/api/subpage/' + index).then(function(response) {
            $scope.pageData = response.data;
            $scope.pageData.description = $sce.trustAsHtml($scope.pageData.description);
            $scope.status = 'ready';
        });
    };
    
    $scope.getAppPages = function() {
        $scope.module = 'pages';
        $scope.action = 'list';
    };

    $scope.getAppUsers = function() {
        $scope.module = 'users';
        $scope.action = 'list';
    };

    $scope.getAppTodos = function() {
        $scope.module = 'todos';
        $scope.action = 'list';
    };

    $scope.getHome();

}]);
