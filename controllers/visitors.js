angular.module('visitorsModule', [])

.controller('visitorsController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $scope.visitors = [];
    
    $scope.getVisitors = function () {
        $scope.action = 'list';
        $http.get('/setting/visitors_excluded').then(function (response) {
            $scope.excludes = response.data;
            $http.get('/setting/visitors_limit').then(function (response) {
                $scope.limit = response.data;
                $http.get('/visitors/' + $scope.excludes.value + '/' + $scope.limit.value, $rootScope.urlConfig).then(function (response) {
                    $scope.visitors = response.data;
                });
            });
        });
    };

    $scope.viewVisitor = function (id) {
        $scope.action = 'view';
        $http.get('/visitors/' + id, $rootScope.urlConfig).then(function (response) {
            $scope.visitor = response.data;
            $scope.visitor.link = $scope.visitor.referer;
            $http.get('/setting/space_characters').then(function (response) {
                $scope.separators = response.data;
                for (i = 0; i < $scope.separators.value.length; i++) {
                    $scope.visitor.referer = $scope.visitor.referer.split($scope.separators.value[i]).join(' ' + $scope.separators.value[i] + ' ');
                    $scope.visitor.url = $scope.visitor.url.split($scope.separators.value[i]).join(' ' + $scope.separators.value[i] + ' ');
                }
            });
        });
    };

    $scope.deleteVisitor = function (id, confirmed) {
		if (!confirmed) {
			$scope.id = id;
			$scope.action = 'dialog';
			$scope.status = null;
		}
		else {
			$scope.action = 'list';
			$http.delete('/visitors/' + id, $rootScope.urlConfig).then(function () {
				$scope.getVisitors();
				$scope.message = 'Odwiedziny zostały usunięte pomyślnie.';
				$scope.status = 'info';
				$('div.alert').fadeIn();
				setTimeout(function() {
					$scope.message = null;
					$scope.status = null;
					$('div.alert').fadeOut();
				}, $rootScope.settings['messages_timeout']);
			});
		}
    };

    $scope.excludeVisitor = function (ip) {
        $scope.action = 'list';
        $http.get('/setting/visitors_excluded').then(function (response) {
            $scope.excludes = response.data;
            var details = { id: $scope.excludes._id, value: $scope.excludes.value };
            $http.put('/visitors/exclude/' + ip, details, $rootScope.urlConfig).then(function () {
                $scope.getVisitors();
                $scope.message = 'Adres został wykluczony pomyślnie.';
                $scope.status = 'info';
                $('div.alert').fadeIn();
                setTimeout(function() {
                    $scope.message = null;
                    $scope.status = null;
                    $('div.alert').fadeOut();
                }, $rootScope.settings['messages_timeout']);
            });
        });
    };

    $scope.cancelVisitor = function () {
        $scope.action = 'list';
    };

}]);
