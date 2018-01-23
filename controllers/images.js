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
    };

    $scope.createImage = function () {
        /*
        $.post('/images', $('form#upload-form').serialize(), $rootScope.urlConfig, function(result) {
            console.log(result);
            $scope.getAppImages();
        });
        */
        $http.post('/images', $('form#upload-form').serialize(), $rootScope.urlConfig).then(function (response) {
            console.log(response);
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
