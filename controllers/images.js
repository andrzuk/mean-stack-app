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
        $scope.action = 'list';
        console.log('Before send:', $scope.upload);
        $http.post('/images', { upload: $scope.upload }, $rootScope.urlConfig).then(function () {
            $scope.formData = {};
            $scope.getImages();
        });
    };

    $scope.editImage = function (id) {
        $scope.action = 'edit';
        $http.get('/images/' + id, $rootScope.urlConfig).then(function (response) {
            $scope.formData = response.data;
        });
    };

    $scope.updateImage = function (id) {
        $scope.action = 'list';
		var fd = new FormData();
		fd.append('file', $scope.formData.file_data);
        $http.put('/images/' + id, fd, $rootScope.urlConfig).then(function () {
            $scope.formData = {};
            $scope.getImages();
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
