angular.module('authModule', [])

.controller('authController', ['$scope', '$http', function ($scope, $http) {

    $scope.getLogin = function() {
        $scope.action = 'login';
        console.log('Login form started', $scope.action);
    };
    
    $scope.loginUser = function () {
        $http.post('/auth/login', $scope.formData).then(function (response) {
            console.log(response);
            console.log('Before:', $scope.currentUser);
            if (response.data.isLogged) {
                $scope.currentUser = response.data;
                $scope.formData = {};
                $scope.action = 'panel';
                console.log('After:', $scope.currentUser);
            }
        });
    };

    $scope.logoutUser = function() {
        $scope.currentUser = {};
        $scope.getHome();
    };

}]);
