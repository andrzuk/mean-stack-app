angular.module('pagesModule', [])

.controller('pagesController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $scope.pages = [];
    
    $scope.getPages = function () {
        $scope.action = 'list';
        $http.get('/pages', $rootScope.urlConfig).then(function (response) {
            $scope.pages = response.data;
        });
    };

    $scope.newPage = function () {
        $scope.action = 'new';
        $scope.formData = {};
        $scope.formData.ip = $rootScope.currentIp;
    };

    $scope.createPage = function () {
        $scope.action = 'list';
        $http.post('/pages', $scope.formData, $rootScope.urlConfig).then(function () {
            $scope.formData = {};
            $scope.getPages();
            $scope.message = 'Strona została dodana pomyślnie.';
            $scope.status = 'info';
            $('div.alert').fadeIn();
            setTimeout(function() {
                $scope.message = null;
                $scope.status = null;
                $('div.alert').fadeOut();
            }, $rootScope.settings['messages_timeout']);
        });
    };

    $scope.editPage = function (id) {
        $scope.action = 'edit';
        $http.get('/pages/' + id, $rootScope.urlConfig).then(function (response) {
            $scope.formData = response.data;
            $scope.formData.ip = $rootScope.currentIp;
        });
    };

    $scope.updatePage = function (id) {
        $scope.action = 'list';
        $http.put('/pages/' + id, $scope.formData, $rootScope.urlConfig).then(function () {
            $scope.formData = {};
            $scope.getPages();
            $scope.message = 'Strona została zmieniona pomyślnie.';
            $scope.status = 'info';
            $('div.alert').fadeIn();
            setTimeout(function() {
                $scope.message = null;
                $scope.status = null;
                $('div.alert').fadeOut();
            }, $rootScope.settings['messages_timeout']);
        });
    };

    $scope.deletePage = function (id) {
        $scope.action = 'list';
        $http.delete('/pages/' + id, $rootScope.urlConfig).then(function () {
            $scope.getPages();
            $scope.message = 'Strona została usunięta pomyślnie.';
            $scope.status = 'info';
            $('div.alert').fadeIn();
            setTimeout(function() {
                $scope.message = null;
                $scope.status = null;
                $('div.alert').fadeOut();
            }, $rootScope.settings['messages_timeout']);
        });
    };

    $scope.cancelPage = function () {
        $scope.action = 'list';
    };

}]);
