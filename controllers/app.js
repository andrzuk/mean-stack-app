angular.module('mainApp', ['authModule', 'pagesModule', 'usersModule', 'todosModule', 'ngSanitize'])

.controller('mainController', ['$rootScope', '$scope', '$http', '$sce', function ($rootScope, $scope, $http, $sce) {

    $scope.layout = {
        home: '../templates/home',
        manual: '../templates/manual',
        contact: '../templates/contact',
        auth: '../templates/auth',
        pages: '../templates/pages',
        users: '../templates/users',
        todos: '../templates/todos',
    };
    
    $rootScope.currentUser = {};
    
    $rootScope.urlConfig = { 
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': window.localStorage.getItem('authToken') 
        } 
    };
    
    $scope.formData = {};
    $scope.pageData = {};
    $rootScope.module = null;
    $rootScope.action = null;
    $scope.status = null;
    
    $scope.getHome = function() {
        $rootScope.module = 'index';
        $rootScope.action = 'home';
        $scope.status = null;
        $scope.getSubpage('index');
    };
    
    $scope.getContact = function () {
        $rootScope.module = 'contact';
        $rootScope.action = 'contact';
        $scope.status = null;
        $scope.getSubpage('contact');
    };

    $scope.getManual = function () {
        $rootScope.module = 'manual';
        $rootScope.action = 'manual';
        $scope.status = null;
    };

    $scope.getSubpage = function (index) {
        $scope.status = 'loading';
        $http.get('/api/subpage/' + index).then(function(response) {
            $scope.pageData = response.data;
            $scope.pageData.description = $sce.trustAsHtml($scope.pageData.description);
            $scope.status = 'ready';
        });
    };
    
    $scope.getLogin = function() {
        $rootScope.module = 'auth';
        $rootScope.action = 'login';
        $scope.status = null;
    };

    $scope.getPanel = function() {
        $rootScope.module = 'auth';
        $rootScope.action = 'panel';
        $scope.status = null;
    };

    $scope.getAppPages = function() {
        if ($rootScope.currentUser.isLogged) {
            $rootScope.module = 'pages';
            $rootScope.action = 'list';
            $scope.status = null;
        }
        else {
            $scope.getLogin();
        }
    };

    $scope.getAppUsers = function() {
        if ($rootScope.currentUser.isLogged) {
            $rootScope.module = 'users';
            $rootScope.action = 'list';
            $scope.status = null;
        }
        else {
            $scope.getLogin();
        }
    };

    $scope.getAppTodos = function() {
        $rootScope.module = 'todos';
        $rootScope.action = 'list';
        $scope.status = null;
    };

    $scope.getHome();

}]);
