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
        $scope.formData = {};
    };

    $scope.createImage = function () {
		var fd = new FormData();
		fd.append('file', $scope.formData.file_data);
        $http.post('/images', fd, {
			transformRequest: angular.identity,
			headers: {
                'Content-Type': undefined,
                'user-id': $rootScope.urlConfig.headers['user-id'],
                'x-access-token': $rootScope.urlConfig.headers['x-access-token']
            }
		}).then(function () {
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
