angular.module('appRoutes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'mainController',
    })
    .when('/contact', {
        templateUrl: 'templates/contact.html',
        controller: 'contactController',
    })
    .when('/users', {
        templateUrl: 'templates/users.html',
        controller: 'usersController',
    })
    .when('/pages', {
        templateUrl: 'templates/pages.html',
        controller: 'pagesController',
    })
    .when('/images', {
        templateUrl: 'templates/images.html',
        controller: 'imagesController',
    })
    .otherwise({
        redirectTo: '/'
    });

}]);
