angular.module('authModule', [])

.controller('authController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $rootScope.loginUser = function () {
        $scope.status = 'wait';
        $http.post('/auth/login', $scope.formData).then(function (response) {
            if (response.data.isLogged) {
                $rootScope.currentUser = response.data;
                window.localStorage.setItem('authToken', $rootScope.currentUser.token);
                $scope.formData = {};
                $rootScope.action = 'panel';
                $scope.message = 'Zostałeś pomyślnie zalogowany.';
                $scope.status = 'info';
            }
            else {
                $scope.message = 'Login lub hasło są nieprawidłowe.';
                $scope.status = 'error';
            }
        });
    };

    $rootScope.logoutUser = function() {
        $http.post('/auth/logout', $rootScope.currentUser).then(function (response) {
            console.log(response);
            if (response.data.ok) {
                $rootScope.currentUser = {};
                window.localStorage.removeItem('authToken');
                $rootScope.action = 'logout';
                $scope.message = 'Zostałeś pomyślnie wylogowany.';
                $scope.status = 'info';
            }
            else {
                $scope.message = 'Wylogowanie nie powiodło się.';
                $scope.status = 'error';
            }
        });
    };

}]);
