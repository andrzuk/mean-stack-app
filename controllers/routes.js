angular.module('appRoutes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'home.html',
        controller: 'mainController',
    })
    .when('/contact', {
        templateUrl: 'contact.html',
        controller: 'contactController',
    })
    .when('/login', {
        templateUrl: 'auth.html',
        controller: 'authController',
    })
    .when('/users', {
        templateUrl: 'users.html',
        controller: 'usersController',
    })
    .when('/pages', {
        templateUrl: 'pages.html',
        controller: 'pagesController',
    })
    .when('/images', {
        templateUrl: 'images.html',
        controller: 'imagesController',
    })
    .otherwise({
        redirectTo: '/'
    });

}]);
