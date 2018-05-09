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
            $http.get('/setting/space_characters').then(function (response) {
                $scope.separators = response.data;
                for (i = 0; i < $scope.separators.value.length; i++) {
                    $scope.visitor.referer = $scope.visitor.referer.replace($scope.separators.value[i], ' ' + $scope.separators.value[i] + ' ');
                }
            });
        });
    };

    $scope.deleteVisitor = function (id) {
        $scope.action = 'list';
        $http.delete('/visitors/' + id, $rootScope.urlConfig).then(function () {
            $scope.getVisitors();
        });
    };

    $scope.cancelVisitor = function () {
        $scope.action = 'list';
    };

}]);
