angular.module('pagesModule', [])

.controller('pagesController', ['$scope', '$http', function ($scope, $http) {

    $scope.getPages = function () {
        $scope.action = 'list';
        $http.get('/pages', $rootScope.urlConfig).then(function (response) {
            $scope.pages = response.data;
        });
    };

    $scope.newPage = function () {
        $scope.action = 'new';
        $scope.formData = {};
        $http.get('http://ipv4.myexternalip.com/json').then(function (response) {
            $scope.formData.ip = response.data.ip;
        });
    };

    $scope.createPage = function () {
        $scope.action = 'list';
        $http.post('/pages', $scope.formData, $rootScope.urlConfig).then(function () {
            $scope.formData = {};
            $scope.getPages();
        });
    };

    $scope.editPage = function (id) {
        $scope.action = 'edit';
        $http.get('/pages/' + id, $rootScope.urlConfig).then(function (response) {
            $scope.formData = response.data;
            $http.get('http://ipv4.myexternalip.com/json').then(function (response) {
                $scope.formData.ip = response.data.ip;
            });
        });
    };

    $scope.updatePage = function (id) {
        $scope.action = 'list';
        $http.put('/pages/' + id, $scope.formData, $rootScope.urlConfig).then(function () {
            $scope.formData = {};
            $scope.getPages();
        });
    };

    $scope.deletePage = function (id) {
        $scope.action = 'list';
        $http.delete('/pages/' + id, $rootScope.urlConfig).then(function () {
            $scope.getPages();
        });
    };

    $scope.cancelPage = function () {
        $scope.action = 'list';
    };

}]);
