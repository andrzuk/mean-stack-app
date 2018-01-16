angular.module('authModule', [])

.controller('authController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $scope.loginUser = function () {
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

    $scope.logoutUser = function() {
        console.log('Wylogowanie...');
        $rootScope.currentUser = {};
        $scope.getHome();
    };

}]);
