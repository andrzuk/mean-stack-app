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
        /*
        $.post('/images', $('form#upload-form').serialize(), $rootScope.urlConfig, function(result) {
            console.log(result);
            $scope.getAppImages();
        });
        
        $http.post('/images', $scope.formData, $rootScope.urlConfig).then(function (response) {
            console.log(response);
            $scope.getImages();
        });
        $http({
            method: 'POST',
            url: '/images',
            type: 'post',
            headers: {
                'user-id': window.localStorage.getItem('userId'),
                'x-access-token': window.localStorage.getItem('authToken') 
            },
            contentType: false,
            processData: false,
            data: new FormData($('form#upload-form'))
        })
        .then(function (data) {
            console.log(data);
        });
        */
        
        var fd = new FormData();
        fd.append('data', $('#file-1'));
        $http.post('/images', fd, $rootScope.urlConfig).then(function (response) {
            console.log(response);
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
