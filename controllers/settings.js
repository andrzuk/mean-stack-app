angular.module('settingsModule', [])

.controller('settingsController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $scope.settings = [];
    
    $scope.getSettings = function () {
        $scope.action = 'list';
        $http.get('/settings', $rootScope.urlConfig).then(function (response) {
            $scope.settings = response.data;
        });
    };

    $scope.newSetting = function () {
        $scope.action = 'new';
        $scope.formData = {};
    };

    $scope.createSetting = function () {
        $scope.action = 'list';
        $http.post('/settings', $scope.formData, $rootScope.urlConfig).then(function () {
            $scope.formData = {};
            $scope.getSettings();
        });
    };

    $scope.editSetting = function (id) {
        $scope.action = 'edit';
        $http.get('/settings/' + id, $rootScope.urlConfig).then(function (response) {
            $scope.formData = response.data;
        });
    };

    $scope.updateSetting = function (id) {
        $scope.action = 'list';
        $http.put('/settings/' + id, $scope.formData, $rootScope.urlConfig).then(function () {
            $scope.formData = {};
            $scope.getSettings();
        });
    };

    $scope.deleteSetting = function (id) {
        $scope.action = 'list';
        $http.delete('/settings/' + id, $rootScope.urlConfig).then(function () {
            $scope.getSettings();
        });
    };

    $scope.cancelSetting = function () {
        $scope.action = 'list';
    };

}]);
