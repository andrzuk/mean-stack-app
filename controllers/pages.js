angular.module('pagesModule', ['ngSanitize'])

.controller('pagesController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

    $scope.formData = {};
    $scope.pageData = {};
    $scope.action = null;
    $scope.status = null;
    
    $scope.getPage = function(id) {
        $http.get('/pages/' + id).then(function(response) {
            return response.data;
        });
    };

    $scope.getPages = function () {
        $scope.action = 'plist';
        $http.get('/pages').then(function (response) {
            $scope.pages = response.data;
        });
    };

    $scope.newPage = function () {
        $scope.action = 'pnew';
        $scope.formData = {};
        $http.get('http://ipv4.myexternalip.com/json').then(function (response) {
            $scope.formData.ip = response.data.ip;
        });
    };

    $scope.createPage = function () {
        $scope.action = 'plist';
        $http.post('/pages', $scope.formData).then(function () {
            $scope.formData = {};
            $scope.getPages();
        });
    };

    $scope.editPage = function (id) {
        $scope.action = 'pedit';
        $http.get('/pages/' + id).then(function (response) {
            $scope.formData = response.data;
            $http.get('http://ipv4.myexternalip.com/json').then(function (response) {
                $scope.formData.ip = response.data.ip;
            });
        });
    };

    $scope.updatePage = function (id) {
        $scope.action = 'plist';
        $http.put('/pages/' + id, $scope.formData).then(function () {
            $scope.formData = {};
            $scope.getPages();
        });
    };

    $scope.deletePage = function (id) {
        $scope.action = 'plist';
        $http.delete('/pages/' + id).then(function () {
            $scope.getPages();
        });
    };

    $scope.cancelPage = function () {
        $scope.action = 'plist';
    };

    $scope.getPages();

}]);
