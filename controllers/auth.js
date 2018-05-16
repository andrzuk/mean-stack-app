angular.module('authModule', [])

.controller('authController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $rootScope.registerUser = function () {
        $scope.status = 'wait';
        $http.post('/auth/register', $scope.formData).then(function (response) {
            if (response.data.isLogged) {
                $rootScope.currentUser = response.data;
                window.localStorage.setItem('userId', $rootScope.currentUser._id);
                $rootScope.urlConfig.headers["user-id"] = window.localStorage.getItem('userId');
                window.localStorage.setItem('authToken', $rootScope.currentUser.token);
                $rootScope.urlConfig.headers["x-access-token"] = window.localStorage.getItem('authToken');
                $scope.formData = {};
                $rootScope.action = 'panel';
                $scope.message = 'Zostałeś pomyślnie zarejestrowany.';
                $scope.status = 'info';
            }
            else {
                $scope.message = 'Rejestracja nie powiodła się.';
                $scope.status = 'error';
            }
        });
    };

    $rootScope.loginUser = function () {
        $scope.status = 'wait';
        $http.post('/auth/login', $scope.formData).then(function (response) {
            if (response.data.isLogged) {
                $rootScope.currentUser = response.data;
                window.localStorage.setItem('userId', $rootScope.currentUser._id);
                $rootScope.urlConfig.headers["user-id"] = window.localStorage.getItem('userId');
                window.localStorage.setItem('authToken', $rootScope.currentUser.token);
                $rootScope.urlConfig.headers["x-access-token"] = window.localStorage.getItem('authToken');
                $scope.formData = {};
                $rootScope.action = 'panel';
                $scope.message = 'Zostałeś pomyślnie zalogowany.';
                $scope.status = 'info';
            }
            else {
                $scope.message = 'Login lub hasło są nieprawidłowe.';
                $scope.status = 'error';
            }
            setTimeout(function() {
                $scope.message = null;
                $scope.status = null;
            }, $rootScope.settings['messages_timeout']);
        });
    };

    $rootScope.logoutUser = function() {
        $http.post('/auth/logout', $rootScope.currentUser).then(function (response) {
            if (response.data.ok) {
                $rootScope.currentUser = {};
                window.localStorage.removeItem('userId');
                $rootScope.urlConfig.headers["user-id"] = window.localStorage.getItem('userId');
                window.localStorage.removeItem('authToken');
                $rootScope.urlConfig.headers["x-access-token"] = window.localStorage.getItem('authToken');
                $rootScope.action = 'logout';
                $scope.message = 'Zostałeś pomyślnie wylogowany.';
                $scope.status = 'info';
            }
            else {
                $scope.message = 'Wylogowanie nie powiodło się.';
                $scope.status = 'error';
            }
            setTimeout(function() {
                $scope.message = null;
                $scope.status = null;
            }, $rootScope.settings['messages_timeout']);
        });
    };

}]);
