angular.module('authModule', [])

.controller('authController', ['$scope', '$http', function ($scope, $http) {

    $scope.loginUser = function () {
        $scope.status = 'wait';
        $http.post('/auth/login', $scope.formData).then(function (response) {
            if (response.data.isLogged) {
                $scope.currentUser = response.data;
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
        $scope.currentUser = {};
        $scope.getHome();
    };

}]);
