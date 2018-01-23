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
        */
        $http({
            method: 'POST',
            url: '/images',
            headers: {
                'Content-Type': 'multipart/form-data',
                'user-id': window.localStorage.getItem('userId'),
                'x-access-token': window.localStorage.getItem('authToken') 
            },
            data: {
                files: $scope.formData
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                var headers = headersGetter();
                delete headers['Content-Type'];
                return formData;
            }
        })
        .then(function (data) {
            console.log(data);
        });
        
        $http.post('/images', { data: $scope.formData }, $rootScope.urlConfig).then(function (response) {
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
