angular.module('imagesModule', [])

.controller('imagesController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $scope.getImages = function () {
        $scope.action = 'list';
        $http.get('/images', $rootScope.urlConfig).then(function (response) {
            $scope.images = response.data;
        });
    };

    $scope.newImage = function () {
        $scope.action = 'new';
        $scope.formData = {};
    };

    $scope.createImage = function () {
        $http.post('/images', { upload: $scope.upload }, $rootScope.urlConfig).then(function () {
            $scope.formData = {};
            $scope.getAppImages();
        });
    };

    $scope.editImage = function (id) {
        $scope.action = 'edit';
        $http.get('/images/' + id, $rootScope.urlConfig).then(function (response) {
            $scope.formData = response.data;
        });
    };

    $scope.updateImage = function (id) {
        $http.put('/images/' + id, { id: id, upload: $scope.upload }, $rootScope.urlConfig).then(function () {
            $scope.formData = {};
            $scope.getAppImages();
        });
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
