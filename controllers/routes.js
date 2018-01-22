angular.module('appRoutes', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'mainController',
        isProtected: false,
    })
    .when('/images', {
        templateUrl: 'templates/images.html',
        controller: 'imagesController',
        isProtected: false,
    })
    .when('/page/:id', {
        templateUrl: 'app/components/page/pageView.html',
        controller: 'PageController',
        isProtected: false,
    })
    .when('/login', {
        templateUrl: 'app/components/login/loginView.html',
        controller: 'AuthController',
        isProtected: false,
    })
    .when('/password', {
        templateUrl: 'app/components/login/passwordView.html',
        controller: 'AuthController',
        isProtected: false,
    })
    .when('/register', {
        templateUrl: 'app/components/register/registerView.html',
        controller: 'AuthController',
        isProtected: false,
    })
    .when('/logout', {
        templateUrl: 'app/components/login/logoutView.html',
        isProtected: true,
    })
    .when('/contact', {
        templateUrl: 'app/components/contact/contactView.html',
        isProtected: false,
    })
    .when('/admin', {
        templateUrl: 'app/components/admin/adminView.html',
        isProtected: true,
    })
    .when('/games', {
        templateUrl: 'app/components/games/gamesView.html',
        isProtected: true,
    })
    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);

}]);
