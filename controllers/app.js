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
    
    $scope.formData = {};
    $scope.pageData = {};
    $rootScope.module = null;
    $rootScope.action = null;
    $rootScope.status = null;
    
    $scope.getHome = function() {
        $rootScope.module = 'index';
        $rootScope.action = 'home';
        $rootScope.status = null;
        $scope.getSubpage('index');
    };
    
    $scope.getContact = function () {
        $rootScope.module = 'contact';
        $rootScope.action = 'contact';
        $rootScope.status = null;
        $scope.getSubpage('contact');
    };

    $scope.getManual = function () {
        $rootScope.module = 'manual';
        $rootScope.action = 'manual';
        $rootScope.status = null;
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
        $rootScope.status = null;
    };

    $scope.getPanel = function() {
        $rootScope.module = 'auth';
        $rootScope.action = 'panel';
        $rootScope.status = null;
    };

    $scope.getAppPages = function() {
        if ($rootScope.currentUser.isLogged) {
            $rootScope.module = 'pages';
            $rootScope.action = 'list';
            $rootScope.status = null;
        }
        else {
            $scope.getLogin();
        }
    };

    $scope.getAppUsers = function() {
        if ($rootScope.currentUser.isLogged) {
            $rootScope.module = 'users';
            $rootScope.action = 'list';
            $rootScope.status = null;
        }
        else {
            $scope.getLogin();
        }
    };

    $scope.getAppTodos = function() {
        $rootScope.module = 'todos';
        $rootScope.action = 'list';
        $rootScope.status = null;
    };

    $scope.getHome();

}]);
