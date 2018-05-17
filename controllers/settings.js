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
            $scope.message = 'Ustawienie zostało dodane pomyślnie.';
            $scope.status = 'info';
            $('div.alert').fadeIn();
            setTimeout(function() {
                $scope.message = null;
                $scope.status = null;
                $('div.alert').fadeOut();
            }, $rootScope.settings['messages_timeout']);
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
            $scope.message = 'Ustawienie zostało zmienione pomyślnie.';
            $scope.status = 'info';
            $('div.alert').fadeIn();
            setTimeout(function() {
                $scope.message = null;
                $scope.status = null;
                $('div.alert').fadeOut();
            }, $rootScope.settings['messages_timeout']);
        });
    };

    $scope.deleteSetting = function (id) {
        $scope.action = 'list';
        $http.delete('/settings/' + id, $rootScope.urlConfig).then(function () {
            $scope.getSettings();
            $scope.message = 'Ustawienie zostało usunięte pomyślnie.';
            $scope.status = 'info';
            $('div.alert').fadeIn();
            setTimeout(function() {
                $scope.message = null;
                $scope.status = null;
                $('div.alert').fadeOut();
            }, $rootScope.settings['messages_timeout']);
        });
    };

    $scope.cancelSetting = function () {
        $scope.action = 'list';
    };

}]);
