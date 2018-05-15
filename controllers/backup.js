angular.module('backupModule', [])

.controller('backupController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $scope.backup = [];
    
    $scope.getBackup = function () {
        $scope.action = 'view';
        $http.get('/backup', $rootScope.urlConfig).then(function (response) {
            $scope.backup = response.data;
        });
    };
    
    $scope.openBackup = function () {
        $scope.action = 'restore';
        $scope.formData = {};
    };

    $scope.restoreBackup = function () {
        $scope.action = 'view';
        $http.post('/backup', $scope.formData, $rootScope.urlConfig).then(function () {
            $scope.formData = {};
        });
    };

    $scope.cancelBackup = function () {
        $scope.action = 'view';
    };

}]);
