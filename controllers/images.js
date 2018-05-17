angular.module('imagesModule', [])

.controller('imagesController', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location) {

    $scope.images = [];
    
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
		var fd = new FormData();
		fd.append('index', $scope.formData.index);
		fd.append('file', $scope.formData.file);
        $http.post('/images', fd, {
			transformRequest: angular.identity,
			headers: {
                'Content-Type': undefined,
                'user-id': $rootScope.urlConfig.headers['user-id'],
                'x-access-token': $rootScope.urlConfig.headers['x-access-token']
            }
		}).then(function (response) {
            $scope.formData = {};
            $scope.getImages();
            $scope.message = 'Obrazek został dodany pomyślnie.';
            $scope.status = 'info';
            $('div.alert').fadeIn();
            setTimeout(function() {
                $scope.message = null;
                $scope.status = null;
                $('div.alert').fadeOut();
            }, $rootScope.settings['messages_timeout']);
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
		fd.append('index', $scope.formData.index);
		fd.append('file', $scope.formData.file);
        $http.put('/images/' + id, fd, {
			transformRequest: angular.identity,
			headers: {
                'Content-Type': undefined,
                'user-id': $rootScope.urlConfig.headers['user-id'],
                'x-access-token': $rootScope.urlConfig.headers['x-access-token']
            }
		}).then(function (response) {
            $scope.formData = {};
            $scope.getImages();
            $scope.message = 'Obrazek został zmieniony pomyślnie.';
            $scope.status = 'info';
            $('div.alert').fadeIn();
            setTimeout(function() {
                $scope.message = null;
                $scope.status = null;
                $('div.alert').fadeOut();
            }, $rootScope.settings['messages_timeout']);
        });
    };

    $scope.previewImage = function (id) {
        $scope.action = 'preview';
        $http.get('/images/' + id, $rootScope.urlConfig).then(function (response) {
            $scope.image = response.data;
        });
    };

    $scope.deleteImage = function (id) {
        $scope.action = 'list';
        $http.delete('/images/' + id, $rootScope.urlConfig).then(function () {
            $scope.getImages();
            $scope.message = 'Obrazek został usunięty pomyślnie.';
            $scope.status = 'info';
            $('div.alert').fadeIn();
            setTimeout(function() {
                $scope.message = null;
                $scope.status = null;
                $('div.alert').fadeOut();
            }, $rootScope.settings['messages_timeout']);
        });
    };

    $scope.cancelImage = function () {
        $scope.action = 'list';
    };

}]);
