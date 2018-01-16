angular.module('authModule', [])

.controller('authController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $rootScope.loginUser = function () {
        $scope.status = 'wait';
        $http.post('/auth/login', $scope.formData).then(function (response) {
            if (response.data.isLogged) {
                $rootScope.currentUser = response.data;
                $scope.formData = {};
                $scope.action = 'panel';
                $scope.message = 'Zostałeś pomyślnie zalogowany';
                $scope.status = 'info';
            }
            else {
                $scope.message = 'Login lub hasło są nieprawidłowe.';
                $scope.status = 'error';
            }
        });
    };

    $rootScope.logoutUser = function() {
        $rootScope.currentUser = {};
        $scope.action = 'logout';
        $scope.message = 'Zostałeś pomyślnie wylogowany';
        $scope.status = 'info';
    };

}]);
