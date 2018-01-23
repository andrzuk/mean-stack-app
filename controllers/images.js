angular.module('imagesModule', [])

.controller('imagesController', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location) {

    $scope.getImages = function () {
        $scope.action = 'list';
        $http.get('/images', $rootScope.urlConfig).then(function (response) {
            $scope.images = response.data;
        });
    };

    $scope.newImage = function () {
        $scope.action = 'new';
    };

    $scope.createImage = function () {
        $location.url('/');
        $rootScope.module = 'images';
        $rootScope.action = 'list';
    };

    $scope.deleteImage = function (id) {
        $scope.action = 'list';
        $http.delete('/images/' + id, $rootScope.urlConfig).then(function () {
            $scope.getImages();
        });
    };

    $scope.cancelImage = function () {
        $scope.action = 'list';
    };

}]);
