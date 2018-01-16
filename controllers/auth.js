angular.module('authModule', [])

.controller('authController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $rootScope.loginUser = function () {
        $rootScope.status = 'wait';
        $http.post('/auth/login', $scope.formData).then(function (response) {
            if (response.data.isLogged) {
                $rootScope.currentUser = response.data;
                $scope.formData = {};
                $rootScope.action = 'panel';
                $scope.message = 'Zostałeś pomyślnie zalogowany';
                $rootScope.status = 'info';
            }
            else {
                $scope.message = 'Login lub hasło są nieprawidłowe.';
                $rootScope.status = 'error';
            }
        });
    };

    $rootScope.logoutUser = function() {
        $rootScope.currentUser = {};
        $rootScope.action = 'logout';
        $scope.message = 'Zostałeś pomyślnie wylogowany';
        $rootScope.status = 'info';
    };

}]);
